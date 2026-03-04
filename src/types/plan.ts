import type { TargetDistance } from './user';

export type PlanStatus = 'draft' | 'active' | 'completed' | 'archived';
export type SessionType =
  | 'Easy Run'
  | 'Long Run'
  | 'Threshold'
  | 'Vo2Max'
  | 'Strength'
  | 'Rest'
  | 'Race'
  | 'Other';

export interface Session {
  id: string;
  day: string;
  type: SessionType;
  durationMinutes: number;
  zone: 1 | 2 | 3 | 4 | 5;
  paceTarget: string;
  description: string;
  notes?: string;
  isModified: boolean;
  isGenerated: boolean;
  warnings?: string[];
}

export interface WeekPlan {
  weekNumber: number;
  focus: string;
  totalMinutes: number;
  intensityDistribution: { easy: number; hard: number };
  sessions: Session[];
}

export interface Plan {
  planId: string;
  metadata: {
    targetDistance: TargetDistance;
    goalTime: string;
    current5kTime: string;
    generatedAt: string;
    status: PlanStatus;
  };
  paces: {
    easy: string;
    tempo: string;
    interval: string;
    rep: string;
    longRun: string;
  };
  weeks: WeekPlan[];
}
