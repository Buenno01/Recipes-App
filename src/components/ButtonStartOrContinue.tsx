import { useNavigate } from 'react-router-dom';
import { RecipeOptionsType } from '../@types/RecipeOptionsType';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { DoneRecipeType } from '../@types/DoneRecipeType';
import BottomFixedBtn from './BottomFixedBtn';

type ButtonStartOrContinueProps = {
  recipeType: RecipeOptionsType;
  id: string | undefined;
};

function ButtonStartOrContinue({ id = '', recipeType }: ButtonStartOrContinueProps) {
  const navigate = useNavigate();
  const [doneRecipesLS] = useLocalStorage<DoneRecipeType[]>('doneRecipes', []);
  if (doneRecipesLS.some((doneRecipe) => doneRecipe.id === id)) return '';

  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes') || '{}');

  const isInProgress = (inProgressRecipes[recipeType]
    && inProgressRecipes[recipeType][id])
    ? 'Continue Recipe' : 'Start Recipe';

  const handleClick = () => {
    if (isInProgress === 'Start Recipe') {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...inProgressRecipes,
        [recipeType]: {
          ...inProgressRecipes[recipeType],
          [id]: [],
        },
      }));

      navigate(`/${recipeType}/${id}/in-progress`);
    }
  };

  return (
    <BottomFixedBtn data-testid="start-recipe-btn" onClick={ handleClick }>
      { isInProgress }
    </BottomFixedBtn>
  );
}

export default ButtonStartOrContinue;
