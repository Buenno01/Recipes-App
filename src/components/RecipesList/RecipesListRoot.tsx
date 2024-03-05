import React, { ReactNode } from 'react';

type RecipesListRootProps = {
  children: ReactNode;
};

function RecipesListRoot({ children }: RecipesListRootProps) {
  return (
    <ul>
      {children}
    </ul>
  );
}

export default RecipesListRoot;
