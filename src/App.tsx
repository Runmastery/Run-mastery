import { useEffect, useState } from 'react';
import { OnboardingFlow } from './components/onboarding/OnboardingFlow';
import { PlanView } from './components/plan/PlanView';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { useOnboarding } from './hooks/useOnboarding';
import { usePlan } from './hooks/usePlan';
import { generatePlan } from './lib/planGenerator';

// TODO: Stripe subscriptions — planned for v2
// TODO: AI coaching chat — planned for v2
// TODO: Device integrations — planned for v2

export default function App() {
  const { profile, setProfile, step, setStep, clear } = useOnboarding();
  const { plan, setPlan, updateSession } = usePlan();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!plan && localStorage.getItem('run-mastery-plan')) {
      setPlan(JSON.parse(localStorage.getItem('run-mastery-plan')!));
    }
  }, [plan, setPlan]);

  const onGenerate = () => {
    setPhase(0);
    const id = setInterval(() => setPhase((p) => Math.min(3, p + 1)), 450);
    setTimeout(() => {
      clearInterval(id);
      const nextPlan = generatePlan(profile);
      setPlan(nextPlan);
      localStorage.setItem('run-mastery-plan', JSON.stringify(nextPlan));
      clear();
    }, 1800);
  };

codex/implement-plan-generation-logic-ft2cv7
  if (!plan && step <= 16) return <OnboardingFlow step={step} profile={profile} setStep={setStep} setProfile={setProfile} onGenerate={onGenerate} />;
=======
  if (!plan && step <= 9) return <OnboardingFlow step={step} profile={profile} setStep={setStep} setProfile={setProfile} onGenerate={onGenerate} />;
main
  if (!plan) return <LoadingScreen phase={phase} />;
  return <PlanView plan={plan} onUpdate={updateSession} />;
}
