import { DoneRecipeType } from './../@types/DoneRecipeType';
import { createContext } from 'react';
import { DoneRecipeContextType } from '../@types/DoneRecipeContextType';
import DoneRecipe from '../components/DoneRecipe';

const INITIAL_VALUE = {
  doneRecipes: [],
  setDoneRecipesContext: ([]) => {},
};
export const DoneRecipeContext = createContext<DoneRecipeContextType>(INITIAL_VALUE);
