import { describe, expect, it } from 'vitest';
import type { WeekPlan } from '../types/plan';
import {
  validateAllRules,
  validateHardSessionCount,
  validateLongRunEasyPace,
  validateNoConsecutiveHardDays,
  validateNoVo2MaxBeforeWeek6,
  validateRestDayPresent,
  validateTwoDaysNoVo2,
  validateVolumeIncrease,
  validateWeek8NoThresholdOrVo2Max,
  validateWeekDeload
} from './planValidation';

const week = (n: number, total: number, overrides: Partial<WeekPlan> = {}): WeekPlan => ({
  weekNumber: n,
  focus: 'x',
  totalMinutes: total,
  intensityDistribution: { easy: 80, hard: 20 },
  sessions: [
    { id: '1', day: 'Monday', type: 'Easy Run', durationMinutes: 40, zone: 2, paceTarget: '6:00/km', description: '', isModified: false, isGenerated: true },
    { id: '2', day: 'Tuesday', type: 'Threshold', durationMinutes: 30, zone: 4, paceTarget: '5:00/km', description: '', isModified: false, isGenerated: true },
    { id: '3', day: 'Wednesday', type: 'Rest', durationMinutes: 0, zone: 1, paceTarget: '-', description: '', isModified: false, isGenerated: true },
    { id: '4', day: 'Sunday', type: 'Long Run', durationMinutes: 60, zone: 2, paceTarget: '6:00/km', description: '', isModified: false, isGenerated: true }
  ],
  ...overrides
});

describe('plan validation rules', () => {
  it('checks hard session count', () => expect(validateHardSessionCount(week(1, 130))).toBe(true));
  it('checks no consecutive hard sessions', () => expect(validateNoConsecutiveHardDays(week(1, 130))).toBe(true));
  it('checks week4 deload', () => expect(validateWeekDeload(week(3, 180), week(4, 140))).toBe(true));
  it('checks week8 no threshold/vo2', () => expect(validateWeek8NoThresholdOrVo2Max(week(8, 120, { sessions: week(1, 130).sessions.map((s) => s.type === 'Threshold' ? { ...s, type: 'Easy Run', zone: 2 } : s) }))).toBe(true));
  it('checks no vo2 before week6', () => expect(validateNoVo2MaxBeforeWeek6([1,2,3,4,5,6,7,8].map((n)=>week(n,120)))).toBe(true));
  it('checks rest day present', () => expect(validateRestDayPresent(week(1, 130))).toBe(true));
  it('checks long run easy pace', () => expect(validateLongRunEasyPace(week(1, 130), '6:00/km')).toBe(true));
  it('checks volume increase', () => expect(validateVolumeIncrease([week(1,100),week(2,110),week(3,121),week(4,90),week(5,99),week(6,108),week(7,118),week(8,70)])).toBe(true));
  it('checks 2 days has no vo2', () => expect(validateTwoDaysNoVo2([week(1,100)], 2)).toBe(true));
  it('aggregates all rules', () => expect(validateAllRules([week(1,100),week(2,110),week(3,121),week(4,90),week(5,99),week(6,108),week(7,118),week(8,70,{sessions: week(8,70).sessions.map((s)=>s.type==='Threshold'?{...s,type:'Easy Run',zone:2}:s)})],'6:00/km',3)).toHaveLength(0));
});
