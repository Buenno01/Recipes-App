import { BasicRecipeInfoType } from './BasicRecipeInfoType';
import { RecipeOptionsType } from './RecipeOptionsType';

export interface RecipeType extends BasicRecipeInfoType {
  type: RecipeOptionsType;
  drinkAlternate: string | null;
  category: string;
  instructions: string;
  tags: string[] | null;
  video: string | null;
  ingredients: string[];
  measures: string[];
  dateModified: string | null;
  creativeCommonsConfirmed: string | null;
  imageSource: string | null;
}
