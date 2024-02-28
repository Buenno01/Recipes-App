import { RecipeType } from './RecipeType';

export interface DrinkRecipeType extends RecipeType {
  type: 'drinks';
  iba: string | null;
  alcoholic: string;
  glass: string;
  imageAttribution: string | null;
}
