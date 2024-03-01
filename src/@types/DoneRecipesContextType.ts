import { DoneRecipeType } from './DoneRecipeType';

export type DoneRecipesContextType = {
  doneRecipesContext: DoneRecipeType[],
  setDoneRecipesContext: (newDoneRecipes: DoneRecipeType[]) => void,
};
