import React, { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface RecipeCardWrapperProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

function RecipeCardWrapper({ children, className, ...rest }: RecipeCardWrapperProps) {
  return (
    <div
      { ...rest }
      className={ twMerge('flex justify-between', className) }
    >
      {children}
    </div>
  );
}

export default RecipeCardWrapper;
