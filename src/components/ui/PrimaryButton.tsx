import type { PropsWithChildren } from 'react';

export const PrimaryButton = ({ children, className = '', ...props }: PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement> & { className?: string }>) => (
  <button
    className={`h-[52px] rounded-[14px] bg-accent px-5 font-extrabold text-black w-full md:w-64 disabled:opacity-40 disabled:cursor-not-allowed ${className}`}
    {...props}
  >
    {children}
  </button>
);
