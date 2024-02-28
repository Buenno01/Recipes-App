import { RecipeType } from './RecipeType';

export interface MealRecipeType extends RecipeType {
  type: 'meals';
  area: string;
  source: string;
}
