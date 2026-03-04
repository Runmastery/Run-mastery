import type { UserProfile } from '../../types/user';
import { PrimaryButton } from '../ui/PrimaryButton';
import { SecondaryButton } from '../ui/SecondaryButton';

const labels = [
  'What distance are you training for?',
  'What is your goal time?',
  'What is your current 5K time?',
  'How many days per week can you train?',
  'Which days work best for you?',
  'What is your running experience?',
  'Any injuries or physical limitations we should know about?',
  'Do you do strength training alongside running?',
  'Summary and confirmation'
];

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const OnboardingFlow = ({ step, profile, setStep, setProfile, onGenerate }: {
  step: number;
  profile: UserProfile;
  setStep: (n: number) => void;
  setProfile: (fn: (p: UserProfile) => UserProfile) => void;
  onGenerate: () => void;
}) => {
  const update = <K extends keyof UserProfile>(k: K, v: UserProfile[K]) => setProfile((p) => ({ ...p, [k]: v }));

  return (
    <div className="min-h-screen bg-surface p-4 md:p-8">
      <div className="max-w-xl mx-auto bg-white border border-border rounded-card shadow-card p-6">
        <p className="text-xs font-bold uppercase tracking-wide text-muted">Step {step}/9</p>
        <h1 className="text-2xl font-black mb-6">{labels[step - 1]}</h1>

        {step === 1 && <select className="w-full border p-3 rounded" value={profile.targetDistance} onChange={(e) => update('targetDistance', e.target.value as UserProfile['targetDistance'])}><option>5K</option><option>10K</option><option>Half Marathon</option><option>Marathon</option></select>}
        {step === 2 && <input className="w-full border p-3 rounded" value={Math.floor(profile.goalTime / 60)} onChange={(e) => update('goalTime', Number(e.target.value) * 60)} />}
        {step === 3 && <input className="w-full border p-3 rounded" value={Math.floor(profile.current5kTime / 60)} onChange={(e) => update('current5kTime', Number(e.target.value) * 60)} />}
        {step === 4 && <select className="w-full border p-3 rounded" value={profile.trainingDaysPerWeek} onChange={(e) => update('trainingDaysPerWeek', Number(e.target.value) as UserProfile['trainingDaysPerWeek'])}>{[2,3,4,5,6].map((n)=><option key={n}>{n}</option>)}</select>}
        {step === 5 && <div className="grid grid-cols-2 gap-2">{days.map((d)=><label key={d} className="border p-2 rounded"><input type="checkbox" checked={profile.preferredDays.includes(d)} onChange={() => update('preferredDays', profile.preferredDays.includes(d) ? profile.preferredDays.filter((x)=>x!==d) : [...profile.preferredDays, d])} /> {d}</label>)}</div>}
        {step === 6 && <select className="w-full border p-3 rounded" value={profile.experienceLevel} onChange={(e) => update('experienceLevel', e.target.value as UserProfile['experienceLevel'])}><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select>}
        {step === 7 && <textarea className="w-full border p-3 rounded" value={profile.injuries} onChange={(e) => update('injuries', e.target.value)} />}
        {step === 8 && <select className="w-full border p-3 rounded" value={profile.includesStrength ? 'yes' : 'no'} onChange={(e) => update('includesStrength', e.target.value === 'yes')}><option value="yes">Yes</option><option value="no">No</option></select>}
        {step === 9 && <pre className="text-xs bg-surface p-3 rounded overflow-auto">{JSON.stringify(profile, null, 2)}</pre>}

        <div className="flex gap-3 mt-6 flex-col md:flex-row">
          {step > 1 && <SecondaryButton onClick={() => setStep(step - 1)}>Back</SecondaryButton>}
          {step < 9 ? <PrimaryButton onClick={() => setStep(step + 1)}>Next</PrimaryButton> : <PrimaryButton onClick={onGenerate}>Generate my plan</PrimaryButton>}
        </div>
      </div>
    </div>
  );
};
