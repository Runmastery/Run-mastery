export const ValidationWarning = ({ message }: { message: string }) => (
  <span title={message} className="inline-flex items-center text-xs border border-zone4 text-zone4 rounded-full px-2 py-0.5">⚠ This conflicts with the Run Mastery method. [See why]</span>
);
