import React, { useState, useEffect } from 'react';
import { DoneRecipeType } from '../../@types/DoneRecipeType';
import { DoneRecipesContext } from '.';

type DoneRecipesProviderType = {
  children: React.ReactNode
};

function DoneRecipesProvider({ children }: DoneRecipesProviderType) {
  const [doneRecipesContext, setNewDoneRecipesContext] = useState<DoneRecipeType[]>([]);

  useEffect(() => {
    const doneRecipesAux = localStorage.getItem('doneRecipes');
    const doneRecipesLocal = doneRecipesAux ? JSON.parse(doneRecipesAux) : [];
    setDoneRecipesContext(doneRecipesLocal);
  }, []);

  const setDoneRecipesContext = (newDoneRecipes: DoneRecipeType[]) => {
    setNewDoneRecipesContext(newDoneRecipes);
    localStorage.setItem('doneRecipes', JSON.stringify(newDoneRecipes));
  };

  return (
    <DoneRecipesContext.Provider value={ { doneRecipesContext, setDoneRecipesContext } }>
      {children}
    </DoneRecipesContext.Provider>
  );
}

export default DoneRecipesProvider;
