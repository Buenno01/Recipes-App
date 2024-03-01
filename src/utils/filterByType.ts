import { formatType } from './formatType';

export const filterRecipesByType = (recipes: { type: string;
  [key: string]: any }[], queryType: string) => recipes
  .filter((recipe) => (formatType(recipe.type) === formatType(queryType)));
