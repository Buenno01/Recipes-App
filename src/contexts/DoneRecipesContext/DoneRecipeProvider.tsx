import React from 'react';
import { DoneRecipeType } from '../../@types/DoneRecipeType';
import { DoneRecipesContext } from '.';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { DoneRecipesContextType } from '../../@types/DoneRecipesContextType';

type DoneRecipesProviderType = {
  children: React.ReactNode
};

function DoneRecipesProvider({ children }: DoneRecipesProviderType) {
  const [
    doneRecipesContext,
    setDoneRecipesContext,
  ] = useLocalStorage<DoneRecipeType[]>('doneRecipes', []);

  const value: DoneRecipesContextType = {
    doneRecipesContext,
    setDoneRecipesContext,
  };

  return (
    <DoneRecipesContext.Provider value={ value }>
      {children}
    </DoneRecipesContext.Provider>
  );
}

export default DoneRecipesProvider;
