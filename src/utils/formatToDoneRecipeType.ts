import { AnyRecipeType } from '../@types/AnyRecipeType';
import { DoneRecipeType } from '../@types/DoneRecipeType';

const formatAlcoholicOrNot = (alcoholic: string): 'Alcoholic' | 'Non alcoholic' => {
  return /non/i.test(alcoholic) ? 'Non alcoholic' : 'Alcoholic';
};

const formatToDoneRecipeType = (recipe: AnyRecipeType): DoneRecipeType => {
  const { id, type, category, name, thumb: image, tags } = recipe;
  return {
    id,
    type: type === 'meals' ? 'meal' : 'drink',
    nationality: type === 'meals' ? recipe.area : '',
    category: category || '',
    alcoholicOrNot: type === 'drinks' ? formatAlcoholicOrNot(recipe.alcoholic) : '',
    name,
    image,
    doneDate: new Date().toISOString(),
    tags: tags || [],
  };
};

export default formatToDoneRecipeType;
