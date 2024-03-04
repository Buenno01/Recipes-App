import { DoneRecipeType } from './DoneRecipeType';

export type DoneRecipesContextType = {
  doneRecipesContext: DoneRecipeType[],
  setDoneRecipesContext: (doneRecipes: DoneRecipeType[]) => void,
};
