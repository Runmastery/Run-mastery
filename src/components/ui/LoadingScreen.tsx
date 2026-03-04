const steps = ['Calculating paces...', 'Setting up base phase...', 'Adding threshold sessions...', 'Finalizing structure...'];

export const LoadingScreen = ({ phase }: { phase: number }) => (
  <div className="min-h-screen flex items-center justify-center bg-surface p-6">
    <div className="bg-white rounded-card border border-border p-8 w-full max-w-md shadow-card">
      <h2 className="font-black text-2xl mb-6">Building your 8-week plan...</h2>
      <ul className="space-y-2">
        {steps.map((s, i) => (
          <li key={s} className={i <= phase ? 'text-textMain font-bold' : 'text-muted'}>{s}</li>
        ))}
      </ul>
    </div>
  </div>
);
