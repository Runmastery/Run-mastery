export type TargetDistance = '5K' | '10K' | 'Half Marathon' | 'Marathon';
export type ExperienceLevel = 'Beginner' | 'Intermediate' | 'Advanced';
codex/implement-plan-generation-logic-ft2cv7
export type SleepHours = 'Less than 6 hours' | '6–7 hours' | '7–8 hours' | '8+ hours';

export interface UserProfile {
  fullName: string;
  email: string;
  dateOfBirth?: string;
  targetDistance: TargetDistance;
  goalTime: number;
  isRaceSpecific: boolean;
  raceDate?: string;
  current5kTime: number;
  experienceLevel: ExperienceLevel;
  trainingDaysPerWeek: 2 | 3 | 4 | 5 | 6;
  preferredDays: string[];
  currentWeeklyVolume: '0–10 km' | '10–25 km' | '25–40 km' | '40–60 km' | '60+ km';
  includesStrength: boolean;
  hadRecentInjury: boolean;
  injuries?: string;
  avoidInTraining?: string;
  sleepHours: SleepHours;
=======

export interface UserProfile {
  targetDistance: TargetDistance;
  goalTime: number;
  current5kTime: number;
  trainingDaysPerWeek: 2 | 3 | 4 | 5 | 6;
  preferredDays: string[];
  experienceLevel: ExperienceLevel;
  injuries?: string;
  includesStrength: boolean;
main
}
