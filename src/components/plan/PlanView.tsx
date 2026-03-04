import { useState } from 'react';
import type { Plan, Session } from '../../types/plan';
import { ValidationWarning } from './ValidationWarning';

const zoneColor: Record<number, string> = { 1: 'bg-zone1 text-black', 2: 'bg-zone2 text-white', 3: 'bg-zone3 text-black', 4: 'bg-zone4 text-white', 5: 'bg-zone5 text-white' };

export const PlanView = ({ plan, onUpdate }: { plan: Plan; onUpdate: (week: number, id: string, updates: Partial<Session>) => void }) => {
  const [week, setWeek] = useState(1);
  const current = plan.weeks.find((w) => w.weekNumber === week)!;

  return (
    <div className="min-h-screen bg-surface p-4 md:p-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-[220px_1fr] gap-4">
        <aside className="bg-white border border-border rounded-card p-3 grid grid-cols-4 md:grid-cols-1 gap-2">
          {plan.weeks.map((w) => <button key={w.weekNumber} onClick={() => setWeek(w.weekNumber)} className={`text-left border rounded p-2 ${week === w.weekNumber ? 'bg-accentWeak border-accent' : 'bg-white border-border'}`}><div className="font-bold">Week {w.weekNumber}</div><div className="text-xs text-muted">{w.focus}</div></button>)}
        </aside>
        <main className="bg-white border border-border rounded-card p-4 overflow-x-auto">
          <div className="grid sm:grid-cols-4 gap-2 mb-4 text-sm">
            <div>Total: {current.totalMinutes} min</div><div>Runs: {current.sessions.filter((s) => s.type !== 'Rest').length}</div><div>{current.intensityDistribution.easy}% easy / {current.intensityDistribution.hard}% hard</div><div>{current.focus}</div>
          </div>
          <table className="w-full text-sm min-w-[680px]">
            <thead><tr className="bg-accent"><th className="p-2 text-left">Day</th><th>Session</th><th>Duration</th><th>Zone</th><th>Description</th></tr></thead>
            <tbody>
              {current.sessions.map((s) => <tr key={s.id} className="border-b even:bg-surface/40"><td className="p-2">{s.day}</td><td>
                <button onClick={() => {
                  const duration = Number(prompt('Duration', String(s.durationMinutes)) ?? s.durationMinutes);
                  onUpdate(current.weekNumber, s.id, { durationMinutes: duration });
                }} className="underline">{s.type}</button>{s.isModified && <span className="ml-2 text-[10px] border rounded-full px-2">Modified</span>}</td><td>{s.durationMinutes} min</td><td><span className={`px-2 py-1 rounded-full text-xs ${zoneColor[s.zone]}`}>Z{s.zone}</span></td><td>{s.description} {s.warnings?.[0] && <ValidationWarning message={s.warnings[0]} />}</td></tr>)}
            </tbody>
          </table>
          <div className="mt-4 p-3 bg-surface rounded">
            <h3 className="font-bold">Pace Reference</h3>
            <p>Easy: {plan.paces.easy} | Tempo: {plan.paces.tempo} | Interval: {plan.paces.interval} | Long run: {plan.paces.longRun}</p>
          </div>
        </main>
      </div>
    </div>
  );
};
