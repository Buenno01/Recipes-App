import { InProgressStorageType } from './InProgressStorageType';
import { RecipeOptionsType } from './RecipeOptionsType';

export type InProgressContextType = {
  progress: InProgressStorageType;
  startNewRecipe: (recipeType: RecipeOptionsType, id: string) => void;
  finishRecipe: (recipeType: RecipeOptionsType, id: string) => void;
  addIngredient: (recipeType: RecipeOptionsType, id: string, ingredient: string) => void;
  removeIngredient: (recipeType: RecipeOptionsType,
    id: string, ingredient: string) => void;
};
