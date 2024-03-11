import React, { ReactNode } from 'react';

type RecipesListRootProps = {
  children: ReactNode;
};

function RecipesListRoot({ children }: RecipesListRootProps) {
  return (
    <ul className="flex flex-wrap justify-between w-11/12 gap-2 mx-auto">
      {children}
    </ul>
  );
}

export default RecipesListRoot;
