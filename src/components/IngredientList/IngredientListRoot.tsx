import React from 'react';

type IngredientListRootProps = {
  children: React.ReactNode;
};

function IngredientListRoot({ children }: IngredientListRootProps) {
  return (
    <ul>
      { children }
    </ul>
  );
}

export default IngredientListRoot;
