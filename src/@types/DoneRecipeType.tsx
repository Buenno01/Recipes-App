import { RecipeType } from './RecipeType';

export interface DoneRecipeType extends RecipeType {
  alcoholicOrNot: 'alcoholic' | 'non-alcoholic' | null,
  doneDate: string,
  nationality: string,
  tags: string, // alterar para string[]
  type: 'meal' | 'drink',
}

export type DoneRecipeProps = {
  doneRecipe: DoneRecipeType,
  index: number
};
