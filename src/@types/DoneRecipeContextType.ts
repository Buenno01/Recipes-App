import { DoneRecipeType } from './DoneRecipeType';

export type DoneRecipeContextType = {
  doneRecipes: DoneRecipeType[] | null,
  setDoneRecipesContext: (newDoneRecipes: DoneRecipeType[]) => void,
};
