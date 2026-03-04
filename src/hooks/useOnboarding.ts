import { useEffect, useState } from 'react';
import type { UserProfile } from '../types/user';

const KEY = 'run-mastery-onboarding';

export const defaultProfile: UserProfile = {
  targetDistance: '10K',
  goalTime: 3000,
  current5kTime: 1680,
  trainingDaysPerWeek: 3,
  preferredDays: ['Tuesday', 'Thursday', 'Saturday'],
  experienceLevel: 'Intermediate',
  injuries: '',
  includesStrength: false
};

export const useOnboarding = () => {
  const [profile, setProfile] = useState<UserProfile>(() => {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) as UserProfile : defaultProfile;
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
