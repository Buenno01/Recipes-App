import { HTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface TopMenuWrapperProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}
function TopMenuWrapper({ children, className, ...rest }: TopMenuWrapperProps) {
  return (
    <div
      { ...rest }
      className={ twMerge('flex content-center', className) }
    >
      { children }
    </div>
  );
}

export default TopMenuWrapper;
