import { AnyRecipeType } from '../@types/AnyRecipeType';
import { FavoriteRecipeType } from '../@types/FavoriteRecipeType';

type AlcoholicOrNotType = 'Alcoholic' | 'Non alcoholic' | '';

const handleAlcoholicOrNot = (alcoholic: string | undefined): AlcoholicOrNotType => {
  if (!alcoholic) return '';
  if (/non/i.test(alcoholic)) return 'Non alcoholic';
  return 'Alcoholic';
};

const formatToFavoriteRecipeType = (recipe: AnyRecipeType): FavoriteRecipeType => {
  const { id, type, category, name, thumb: image } = recipe;
  const { area: nationality, alcoholic: alcoholicOrNot } = {
    area: recipe.type === 'meals' ? recipe.area : '',
    alcoholic: handleAlcoholicOrNot(recipe.type === 'drinks'
      ? recipe.alcoholic : undefined),
  };
  const favoriteRecipe: FavoriteRecipeType = {
    id,
    type: type === 'meals' ? 'meal' : 'drink',
    alcoholicOrNot,
    category,
    image,
    name,
    nationality,
  };

  return favoriteRecipe;
};

export default formatToFavoriteRecipeType;
