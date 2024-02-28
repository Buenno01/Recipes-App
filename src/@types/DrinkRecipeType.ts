import { RecipeType } from './RecipeType';

export interface DrinkRecipeType extends RecipeType {
  iba: string | null;
  alcoholic: string;
  glass: string;
  imageAttribution: string | null;
}
