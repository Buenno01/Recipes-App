import React from 'react';

type RecipeCardContentProps = {
  children: React.ReactNode
};

function RecipeCardContent({ children }: RecipeCardContentProps) {
  return (
    <div className="flex flex-col px-6 py-8 w-1/2 justify-between">{children}</div>
  );
}

export default RecipeCardContent;
