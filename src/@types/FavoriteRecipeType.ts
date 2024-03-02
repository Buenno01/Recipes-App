export type FavoriteRecipeType = {
  id: string;
  type: 'meal' | 'drink';
  nationality: string | '';
  category: string | '';
  alcoholicOrNot: 'Alcoholic' | 'Non alcoholic' | '';
  name: string;
  image: string;
};
