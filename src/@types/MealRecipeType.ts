import { RecipeType } from './RecipeType';

export interface MealRecipeType extends RecipeType {
  area: string;
  source: string;
}
