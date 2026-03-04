import type { PropsWithChildren } from 'react';

export const PrimaryButton = ({ children, ...props }: PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>) => (
  <button className="h-[52px] rounded-[14px] bg-accent px-5 font-extrabold text-black w-full md:w-64" {...props}>{children}</button>
);
