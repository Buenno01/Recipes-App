import React, { ReactNode } from 'react';

interface RecipesListRootProps extends React.HTMLAttributes<HTMLUListElement> {
  children: ReactNode;
}

function RecipesListRoot({ children, ...rest }: RecipesListRootProps) {
  return (
    <ul { ...rest } className="flex flex-wrap justify-between w-11/12 gap-2 mx-auto">
      {children}
    </ul>
  );
}

export default RecipesListRoot;
