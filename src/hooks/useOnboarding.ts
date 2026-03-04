import { useEffect, useState } from 'react';
import type { UserProfile } from '../types/user';

const KEY = 'run-mastery-onboarding';

export const defaultProfile: UserProfile = {
  fullName: '',
  email: '',
  dateOfBirth: '',
  targetDistance: '10K',
  goalTime: 3000,
  isRaceSpecific: false,
  raceDate: '',
  current5kTime: 1680,
  experienceLevel: 'Intermediate',
  trainingDaysPerWeek: 3,
  preferredDays: ['Tuesday', 'Thursday', 'Saturday'],
  currentWeeklyVolume: '10–25 km',
  includesStrength: false,
  hadRecentInjury: false,
  injuries: '',
  avoidInTraining: '',
  sleepHours: '7–8 hours'
};

export const useOnboarding = () => {
  const [profile, setProfile] = useState<UserProfile>(() => {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as UserProfile) : defaultProfile;
  });
  const [step, setStep] = useState<number>(() => Number(localStorage.getItem(`${KEY}-step`) ?? 1));

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(profile));
    localStorage.setItem(`${KEY}-step`, String(step));
  }, [profile, step]);

  const clear = () => {
    localStorage.removeItem(KEY);
    localStorage.removeItem(`${KEY}-step`);
  };

  return { profile, setProfile, step, setStep, clear };
};
