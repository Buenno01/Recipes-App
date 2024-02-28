import { RecipeOptionsType } from './RecipeOptionsType';

export interface RecipeType {
  type: RecipeOptionsType;
  id: string;
  name: string;
  drinkAlternate: string | null;
  category: string;
  instructions: string;
  thumb: string;
  tags: string | null;
  video: string | null;
  ingredients: string[];
  measures: string[];
  dateModified: string | null;
  creativeCommonsConfirmed: string | null;
  imageSource: string | null;
}
