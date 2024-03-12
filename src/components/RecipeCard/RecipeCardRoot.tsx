import React from 'react';

type RecipeCardRootProps = {
  children: React.ReactNode
};
function RecipeCardRoot({ children }: RecipeCardRootProps) {
  return (
    <div className="flex w-full h-48 overflow-hidden rounded-lg border">{children}</div>
  );
}

export default RecipeCardRoot;
