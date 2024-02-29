import { DoneRecipeType } from './DoneRecipeType';

export type DoneRecipeContextType = {
  doneRecipes: DoneRecipeType[],
  setDoneRecipesContext: (newDoneRecipes: DoneRecipeType[]) => void,
};
