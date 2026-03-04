import { useState } from 'react';
import type { Plan, Session } from '../types/plan';
import { validateAllRules } from '../lib/planValidation';

export const usePlan = () => {
  const [plan, setPlan] = useState<Plan | null>(null);

  const updateSession = (weekNumber: number, sessionId: string, updates: Partial<Session>) => {
    setPlan((prev) => {
      if (!prev) return prev;
      const weeks = prev.weeks.map((w) => {
        if (w.weekNumber !== weekNumber) return w;
        const sessions = w.sessions.map((s) => (s.id === sessionId ? { ...s, ...updates, isModified: true } : s));
        return { ...w, sessions, totalMinutes: sessions.reduce((a, s) => a + s.durationMinutes, 0) };
      });
      const warnings = validateAllRules(weeks, prev.paces.easy, 3);
      const tagged = weeks.map((w) => ({
        ...w,
        sessions: w.sessions.map((s) => ({ ...s, warnings: warnings.filter((x) => x.includes(`Week ${w.weekNumber}`)) }))
      }));
      return { ...prev, weeks: tagged };
    });
  };

  return { plan, setPlan, updateSession };
};
