codex/implement-plan-generation-logic-ft2cv7
import type { ReactNode } from 'react';
import type { UserProfile } from '../../types/user';
import { PrimaryButton } from '../ui/PrimaryButton';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;

const optionClass = 'w-fit rounded-xl border border-border bg-white px-3 py-2 text-[32px] leading-none';

const QuestionBlock = ({
  title,
  subtitle,
  children
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) => (
  <div className="space-y-4">
    <h2 className="text-[44px] leading-[1.1] font-black text-textMain max-w-2xl">{title}</h2>
    {subtitle && <p className="text-muted text-lg">{subtitle}</p>}
    {children}
  </div>
);

const SelectPill = ({
  letter,
  label,
  selected,
  onClick
}: {
  letter: string;
  label: string;
  selected: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex items-center gap-3 rounded-xl border px-3 py-2 text-left min-h-11 ${selected ? 'border-[#efc75e] bg-[#fff8dc]' : 'border-border bg-white'}`}
  >
    <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-[#656565] text-white text-sm font-bold">{letter}</span>
    <span className="text-[31px] leading-none">{label}</span>
  </button>
);

const totalSteps = 16;

export const OnboardingFlow = ({
  step,
  profile,
  setStep,
  setProfile,
  onGenerate
}: {
=======
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
main
  step: number;
  profile: UserProfile;
  setStep: (n: number) => void;
  setProfile: (fn: (p: UserProfile) => UserProfile) => void;
  onGenerate: () => void;
}) => {
  const update = <K extends keyof UserProfile>(k: K, v: UserProfile[K]) => setProfile((p) => ({ ...p, [k]: v }));

codex/implement-plan-generation-logic-ft2cv7
  const canProceed = () => {
    if (step === 1) return profile.fullName.trim().length > 1;
    if (step === 2) return profile.email.includes('@');
    if (step === 4) return profile.goalTime > 0;
    if (step === 6 && profile.isRaceSpecific) return Boolean(profile.raceDate);
    if (step === 7) return profile.current5kTime > 0;
    if (step === 9) return profile.preferredDays.length >= 2;
    return true;
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7] px-5 py-10 md:px-12">
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-6">
          <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-accent text-[17px] font-black leading-tight text-center">RUN<br/>MASTERY</div>
        </div>

        <div className="mb-8">
          <p className="text-lg text-muted">Smarter 8-Week</p>
          <h1 className="text-[56px] leading-[1.05] font-black text-textMain">Performance Intake</h1>
          <p className="mt-2 text-muted">Answer a few structured questions so your training block is built with precision.</p>
          <p className="text-muted">Estimated time: 3-5 minutes</p>
          <div className="mt-4 h-2 w-full rounded-full bg-[#e7e7e7]">
            <div className="h-2 rounded-full bg-accent transition-all" style={{ width: `${(step / totalSteps) * 100}%` }} />
          </div>
        </div>

        {step > 1 && (
          <button type="button" onClick={() => setStep(step - 1)} className="mb-6 inline-flex items-center gap-2 text-muted hover:text-textMain">
            ← Back
          </button>
        )}

        {step === 1 && <QuestionBlock title="Your full name *"><input className={optionClass} placeholder="Name" value={profile.fullName} onChange={(e) => update('fullName', e.target.value)} /></QuestionBlock>}

        {step === 2 && <QuestionBlock title="Email address *" subtitle="Your plan will be delivered to this address."><input className={optionClass} placeholder="Email" value={profile.email} onChange={(e) => update('email', e.target.value)} /></QuestionBlock>}

        {step === 3 && <QuestionBlock title="Date of birth (optional)"><input type="date" className={optionClass} value={profile.dateOfBirth} onChange={(e) => update('dateOfBirth', e.target.value)} /></QuestionBlock>}

        {step === 4 && <QuestionBlock title="Select your primary objective *"><div className="flex flex-col gap-3">{(['5K', '10K', 'Half Marathon', 'Marathon'] as const).map((d, i) => <SelectPill key={d} letter={String.fromCharCode(65 + i)} label={`Improve ${d} performance`} selected={profile.targetDistance === d} onClick={() => update('targetDistance', d)} />)}</div></QuestionBlock>}

        {step === 5 && <QuestionBlock title="Enter your target finish time (optional) *" subtitle="This helps determine training intensity and progression."><input className={optionClass} placeholder="mm:ss or hh:mm:ss" value={Math.floor(profile.goalTime / 60)} onChange={(e) => update('goalTime', Number(e.target.value || 0) * 60)} /></QuestionBlock>}

        {step === 6 && <QuestionBlock title="Is this for a specific race? *"><div className="flex flex-col gap-2"><SelectPill letter="A" label="Yes" selected={profile.isRaceSpecific} onClick={() => update('isRaceSpecific', true)} /><SelectPill letter="B" label="No" selected={!profile.isRaceSpecific} onClick={() => update('isRaceSpecific', false)} /></div></QuestionBlock>}

        {step === 7 && <QuestionBlock title="Race date *" subtitle="This determines the structure and taper of your training block."><input type="date" className={optionClass} value={profile.raceDate} onChange={(e) => update('raceDate', e.target.value)} /></QuestionBlock>}

        {step === 8 && <QuestionBlock title="Current 5K performance (or best estimate) *"><input className={optionClass} placeholder="minutes" value={Math.floor(profile.current5kTime / 60)} onChange={(e) => update('current5kTime', Number(e.target.value || 0) * 60)} /></QuestionBlock>}

        {step === 9 && <QuestionBlock title="How long have you trained consistently? *"><div className="flex flex-col gap-2">{(['Beginner', 'Intermediate', 'Advanced'] as const).map((v, i) => <SelectPill key={v} letter={String.fromCharCode(65 + i)} label={v} selected={profile.experienceLevel === v} onClick={() => update('experienceLevel', v)} />)}</div></QuestionBlock>}

        {step === 10 && <QuestionBlock title="Available training days per week *"><div className="flex flex-col gap-2">{([2, 3, 4, 5, 6] as const).map((n, i) => <SelectPill key={n} letter={String.fromCharCode(65 + i)} label={`${n}`} selected={profile.trainingDaysPerWeek === n} onClick={() => update('trainingDaysPerWeek', n)} />)}</div></QuestionBlock>}

        {step === 11 && <QuestionBlock title="Preferred training days *" subtitle="Choose at least 2 days."><div className="flex flex-wrap gap-2">{days.map((d) => <button type="button" key={d} className={`rounded-full border px-4 py-2 min-h-11 ${profile.preferredDays.includes(d) ? 'bg-accentWeak border-accent' : 'bg-white border-border'}`} onClick={() => update('preferredDays', profile.preferredDays.includes(d) ? profile.preferredDays.filter((x) => x !== d) : [...profile.preferredDays, d])}>{d.slice(0, 3)}</button>)}</div></QuestionBlock>}

        {step === 12 && <QuestionBlock title="Current weekly running volume *" subtitle="Used to calibrate training load and progression rate."><div className="flex flex-col gap-2">{(['0–10 km', '10–25 km', '25–40 km', '40–60 km', '60+ km'] as const).map((v, i) => <SelectPill key={v} letter={String.fromCharCode(65 + i)} label={v} selected={profile.currentWeeklyVolume === v} onClick={() => update('currentWeeklyVolume', v)} />)}</div></QuestionBlock>}

        {step === 13 && <QuestionBlock title="Do you want to include strength training or cross training? *" subtitle="Weekly load is adjusted when strength is included."><div className="flex flex-col gap-2"><SelectPill letter="A" label="Yes" selected={profile.includesStrength} onClick={() => update('includesStrength', true)} /><SelectPill letter="B" label="No" selected={!profile.includesStrength} onClick={() => update('includesStrength', false)} /></div></QuestionBlock>}

        {step === 14 && <QuestionBlock title="Injury in the past 6 months? *"><div className="flex flex-col gap-2"><SelectPill letter="A" label="Yes" selected={profile.hadRecentInjury} onClick={() => update('hadRecentInjury', true)} /><SelectPill letter="B" label="No" selected={!profile.hadRecentInjury} onClick={() => update('hadRecentInjury', false)} /></div></QuestionBlock>}

        {step === 15 && <QuestionBlock title="Is there anything you should avoid in training?"><textarea className={`${optionClass} min-h-32 w-full max-w-2xl`} value={profile.avoidInTraining} onChange={(e) => { update('avoidInTraining', e.target.value); update('injuries', e.target.value); }} /></QuestionBlock>}

        {step === 16 && <QuestionBlock title="On average, how many hours do you sleep? *"><div className="flex flex-col gap-2">{(['Less than 6 hours', '6–7 hours', '7–8 hours', '8+ hours'] as const).map((v, i) => <SelectPill key={v} letter={String.fromCharCode(65 + i)} label={v} selected={profile.sleepHours === v} onClick={() => update('sleepHours', v)} />)}</div></QuestionBlock>}

        <div className="mt-8">
          {step < totalSteps ? (
            <PrimaryButton disabled={!canProceed()} onClick={() => setStep(step + 1)}>Next →</PrimaryButton>
          ) : (
            <PrimaryButton onClick={onGenerate}>Generate my plan</PrimaryButton>
          )}
=======
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
main
        </div>
      </div>
    </div>
  );
};
