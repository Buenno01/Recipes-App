import { FavoriteRecipeType } from './FavoriteRecipeType';

export type FavoriteRecipesContextType = {
  favoriteRecipes: FavoriteRecipeType[];
  setFavoriteRecipes: (favoriteRecipes: FavoriteRecipeType[]) => void;
};
