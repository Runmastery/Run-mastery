export type TargetDistance = '5K' | '10K' | 'Half Marathon' | 'Marathon';
export type ExperienceLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface UserProfile {
  targetDistance: TargetDistance;
  goalTime: number;
  current5kTime: number;
  trainingDaysPerWeek: 2 | 3 | 4 | 5 | 6;
  preferredDays: string[];
  experienceLevel: ExperienceLevel;
  injuries?: string;
  includesStrength: boolean;
}
