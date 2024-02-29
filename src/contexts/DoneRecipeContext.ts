import { createContext } from 'react';
import { DoneRecipeContextType } from '../@types/DoneRecipeContextType';

/*
const doneRecipesAux = localStorage.getItem('doneRecipes');
const doneRecipesLocal = doneRecipesAux ? JSON.parse(doneRecipesAux) : null;
*/

const INITIAL_VALUE = {
  doneRecipes: [],
  setDoneRecipesContext: () => {},
};
export const DoneRecipeContext = createContext<DoneRecipeContextType>(INITIAL_VALUE);
export const useDoneRecipeContext = useContext(DoneRecipeContext)
