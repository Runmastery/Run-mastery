import type { Plan, Session, WeekPlan } from '../types/plan';
import type { UserProfile } from '../types/user';
import { calculatePaces, secondsToClock } from './paceUtils';
import { injuryWarningsForSession } from './planValidation';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const DISTANCE_PEAK_MINUTES: Record<UserProfile['targetDistance'], number> = {
  '5K': 180,
  '10K': 240,
  'Half Marathon': 330,
  Marathon: 420
};

const focusByWeek = ['Base', 'Base', 'Base + Threshold', 'Base + Threshold', 'Threshold', 'Threshold', 'Vo2Max', 'Test Week'];

const buildWeekVolume = (peak: number): number[] => {
  const week1 = Math.round(peak * 0.6);
  const week2 = Math.round(week1 * 1.1);
  const week3 = Math.round(week2 * 1.1);
  const week4 = Math.round(week3 * 0.75);
  const week5 = Math.round(week4 * 1.1);
  const week6 = Math.round(week5 * 1.1);
  const week7 = Math.round(week6 * 1.1);
  const week8 = Math.round(week7 * 0.6);
  return [week1, week2, week3, week4, week5, week6, week7, week8];
};

const createRestSessions = (): Session[] => DAYS.map((day, i) => ({ id: `rest-${day}-${i}`, day, type: 'Rest', durationMinutes: 0, zone: 1, paceTarget: '-', description: 'Full rest.', isModified: false, isGenerated: true }));

const hardDaysSafe = (preferredDays: string[], longRunDay: string): string[] => preferredDays.filter((d) => d !== longRunDay && Math.abs(DAYS.indexOf(d) - DAYS.indexOf(longRunDay)) > 1);

export const generatePlan = (profile: UserProfile): Plan => {
  const paces = calculatePaces(profile.current5kTime);
  const peak = DISTANCE_PEAK_MINUTES[profile.targetDistance];
  const weeklyVolumes = buildWeekVolume(peak);
  const longRunDay = profile.preferredDays[profile.preferredDays.length - 1] ?? 'Sunday';
  const midDays = hardDaysSafe(profile.preferredDays, longRunDay);
  const injuryLower = (profile.injuries ?? '').toLowerCase();

  const weeks: WeekPlan[] = weeklyVolumes.map((total, idx) => {
    const weekNumber = idx + 1;
    const sessions = createRestSessions();
    const runDays = profile.preferredDays.slice(0, profile.trainingDaysPerWeek);
    const longRunDuration = Math.round((weekNumber < 4 ? 0.33 : weekNumber < 7 ? 0.38 : 0.3) * total * (injuryLower.includes('knee') ? 0.9 : 1));

    runDays.forEach((d, i) => {
      const target = sessions.find((s) => s.day === d);
      if (!target) return;
      target.type = d === longRunDay ? 'Long Run' : 'Easy Run';
      target.zone = 2;
      target.durationMinutes = d === longRunDay ? longRunDuration : Math.round((total - longRunDuration) / Math.max(1, runDays.length - 1));
      target.paceTarget = paces.easy;
      target.description = 'Run steady in Zone 2 with controlled breathing.';
    });

    const assignHard = (day: string, type: 'Threshold' | 'Vo2Max', duration: number, zone: 4 | 5, pace: string) => {
      const t = sessions.find((s) => s.day === day);
      if (!t) return;
      t.type = type;
      t.zone = zone;
      t.durationMinutes = duration;
      t.paceTarget = pace;
      t.description = type === 'Threshold' ? 'Sustain strong but controlled pace, avoid drift above Zone 4.' : 'Run 4x4 min at Zone 5 with 3 min easy recoveries.';
    };

    if (weekNumber >= 3 && weekNumber <= 6 && weekNumber !== 8 && midDays[0]) assignHard(midDays[0], 'Threshold', weekNumber === 4 ? 20 : 32, 4, paces.tempo);
    if (weekNumber === 7) {
      if (midDays[0]) assignHard(midDays[0], 'Threshold', 20, 4, paces.tempo);
      if (profile.trainingDaysPerWeek > 2 && midDays[1]) assignHard(midDays[1], 'Vo2Max', 30, 5, paces.interval);
    }

    if (weekNumber === 8) {
      const race = sessions.find((s) => s.day === longRunDay);
      if (race) {
        race.type = 'Race';
        race.zone = 5;
        race.durationMinutes = 35;
        race.paceTarget = paces.interval;
        race.description = 'Run Cooper test or goal race effort with controlled start and strong finish.';
      }
    }

    if (profile.includesStrength) {
      const easyDay = runDays.find((d) => d !== longRunDay && !midDays.includes(d));
      const t = sessions.find((s) => s.day === easyDay);
      if (t && t.type === 'Easy Run') {
        t.notes = 'Add 20-30 min strength after the run.';
      }
    }

    sessions.forEach((s) => {
      if ((injuryLower.includes('achilles') || injuryLower.includes('heel')) && s.type === 'Vo2Max') {
        s.type = 'Threshold';
        s.zone = 4;
        s.paceTarget = paces.tempo;
        s.notes = 'Adjusted from Vo2Max due to Achilles/heel concern.';
      }
      s.warnings = injuryWarningsForSession(s, profile.injuries ?? '');
    });

    const hardMinutes = sessions.filter((s) => s.zone >= 4).reduce((acc, s) => acc + s.durationMinutes, 0);
    const easyMinutes = Math.max(0, sessions.reduce((acc, s) => acc + s.durationMinutes, 0) - hardMinutes);

    return {
      weekNumber,
      focus: focusByWeek[idx],
      totalMinutes: sessions.reduce((acc, s) => acc + s.durationMinutes, 0),
      intensityDistribution: {
        easy: Math.round((easyMinutes / Math.max(1, easyMinutes + hardMinutes)) * 100),
        hard: Math.round((hardMinutes / Math.max(1, easyMinutes + hardMinutes)) * 100)
      },
      sessions
    };
  });

  return {
    planId: crypto.randomUUID(),
    metadata: {
      targetDistance: profile.targetDistance,
      goalTime: secondsToClock(profile.goalTime),
      current5kTime: secondsToClock(profile.current5kTime),
      generatedAt: new Date().toISOString(),
      status: 'draft'
    },
    paces,
    weeks
  };
};
