import React from 'react';
import { DoneRecipeType } from '../../@types/DoneRecipeType';
import { DoneRecipesContext } from '.';
import { useLocalStorage } from '../../hooks/useLocalStorage';

type DoneRecipesProviderType = {
  children: React.ReactNode
};

function DoneRecipesProvider({ children }: DoneRecipesProviderType) {
  const [
    doneRecipesContext,
    setDoneRecipesContext,
  ] = useLocalStorage<DoneRecipeType[]>('doneRecipes', []);

  return (
    <DoneRecipesContext.Provider value={ { doneRecipesContext, setDoneRecipesContext } }>
      {children}
    </DoneRecipesContext.Provider>
  );
}

export default DoneRecipesProvider;
