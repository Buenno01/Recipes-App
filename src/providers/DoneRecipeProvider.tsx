import React, { useState, useEffect } from 'react';
import { DoneRecipeType } from '../@types/DoneRecipeType';
import { DoneRecipeContext } from '../contexts/DoneRecipeContext';

type DoneRecipesProviderType = {
  children: React.ReactNode
};

function DoneRecipesProvider({ children }: DoneRecipesProviderType) {
  const [doneRecipes, setDoneRecipes] = useState<DoneRecipeType[]>([]);

  useEffect(() => {
    const doneRecipesAux = localStorage.getItem('doneRecipes');
    const doneRecipesLocal = doneRecipesAux ? JSON.parse(doneRecipesAux) : null;
    setDoneRecipes(doneRecipesLocal);
    console.log('aqui');
  }, []);

  const setDoneRecipesContext = (newDoneRecipes: DoneRecipeType[]) => {
    setDoneRecipes(newDoneRecipes);
  };

  return (
    <DoneRecipeContext.Provider value={ { doneRecipes, setDoneRecipesContext } }>
      {children}
    </DoneRecipeContext.Provider>
  );
}

export default DoneRecipesProvider;
