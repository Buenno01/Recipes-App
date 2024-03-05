export type FavoriteRecipeType = {
  id: string;
  type: 'meal' | 'drink';
  nationality: string | '';
  category: string | '';
  alcoholicOrNot: 'Alcoholic' | 'Non alcoholic' | '';
  name: string;
  image: string;
};

export type FavoriteRecipeProps = {
  favoriteRecipe: FavoriteRecipeType,
  index: number,
  favoriteRecipesLS: FavoriteRecipeType[],
  setFavoriteRecipesLS: (favoriteRecipe: FavoriteRecipeType[]) => void,
};
