import type { Session, WeekPlan } from '../types/plan';

const dayIndex = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const validateHardSessionCount = (week: WeekPlan): boolean => week.sessions.filter((s) => s.zone >= 4).length <= 2;

export const validateNoConsecutiveHardDays = (week: WeekPlan): boolean => {
  const hard = week.sessions.filter((s) => s.zone >= 4).map((s) => dayIndex.indexOf(s.day)).sort((a, b) => a - b);
  return hard.every((d, i) => i === 0 || d - hard[i - 1] > 1);
};

export const validateWeekDeload = (week3: WeekPlan, week4: WeekPlan): boolean => week4.totalMinutes < week3.totalMinutes;

export const validateWeek8NoThresholdOrVo2Max = (week8: WeekPlan): boolean => !week8.sessions.some((s) => s.type === 'Threshold' || s.type === 'Vo2Max');

export const validateNoVo2MaxBeforeWeek6 = (weeks: WeekPlan[]): boolean => !weeks.slice(0, 5).some((w) => w.sessions.some((s) => s.type === 'Vo2Max'));

export const validateRestDayPresent = (week: WeekPlan): boolean => week.sessions.some((s) => s.type === 'Rest');

export const validateLongRunEasyPace = (week: WeekPlan, easyPace: string): boolean =>
  week.sessions.filter((s) => s.type === 'Long Run').every((s) => s.paceTarget === easyPace && s.zone === 2);

export const validateVolumeIncrease = (weeks: WeekPlan[]): boolean =>
  weeks.every((w, i) => {
    if (i === 0) return true;
    const prev = weeks[i - 1].totalMinutes;
    const allowed = prev * 1.1;
    return w.weekNumber === 4 || w.weekNumber === 8 || w.totalMinutes <= allowed;
  });

export const validateTwoDaysNoVo2 = (weeks: WeekPlan[], trainingDays: number): boolean =>
  trainingDays !== 2 || !weeks.some((w) => w.sessions.some((s) => s.type === 'Vo2Max'));

export const injuryWarningsForSession = (session: Session, injuries: string): string[] => {
  const lower = injuries.toLowerCase();
  const warnings: string[] = [];
  if ((lower.includes('achilles') || lower.includes('heel')) && session.type === 'Vo2Max') warnings.push('Achilles/heel sensitivity: replace intervals with tempo.');
  if (lower.includes('knee') && session.type === 'Long Run') warnings.push('Knee pain: reduce long run duration by 10%.');
  return warnings;
};

export const validateAllRules = (weeks: WeekPlan[], easyPace: string, trainingDays: number): string[] => {
  const errors: string[] = [];
  weeks.forEach((w) => {
    if (!validateHardSessionCount(w)) errors.push(`Week ${w.weekNumber}: more than 2 hard sessions.`);
    if (!validateNoConsecutiveHardDays(w)) errors.push(`Week ${w.weekNumber}: consecutive hard sessions.`);
    if (!validateRestDayPresent(w)) errors.push(`Week ${w.weekNumber}: no rest day.`);
    if (!validateLongRunEasyPace(w, easyPace)) errors.push(`Week ${w.weekNumber}: long run pace mismatch.`);
  });
  if (!validateWeekDeload(weeks[2], weeks[3])) errors.push('Week 4 deload invalid.');
  if (!validateWeek8NoThresholdOrVo2Max(weeks[7])) errors.push('Week 8 has threshold/Vo2Max.');
  if (!validateNoVo2MaxBeforeWeek6(weeks)) errors.push('Vo2Max appears before week 6.');
  if (!validateVolumeIncrease(weeks)) errors.push('Volume increase exceeds 10%.');
  if (!validateTwoDaysNoVo2(weeks, trainingDays)) errors.push('Vo2Max invalid for 2 days/week.');
  return errors;
};
