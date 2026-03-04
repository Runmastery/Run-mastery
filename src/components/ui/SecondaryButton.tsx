import type { PropsWithChildren } from 'react';

export const SecondaryButton = ({ children, ...props }: PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>) => (
  <button className="h-[52px] rounded-[14px] border border-border px-5 font-bold text-textMain w-full md:w-64" {...props}>{children}</button>
);
