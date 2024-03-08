import { useNavigate } from 'react-router-dom';
import { RecipeOptionsType } from '../@types/RecipeOptionsType';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { DoneRecipeType } from '../@types/DoneRecipeType';
import BottomFixedBtn from './BottomFixedBtn';
import { useInProgressContext } from '../contexts/InProgressContext';

type ButtonStartOrContinueProps = {
  recipeType: RecipeOptionsType;
  id: string | undefined;
};

function ButtonStartOrContinue({ id = '', recipeType }: ButtonStartOrContinueProps) {
  const navigate = useNavigate();
  const [doneRecipesLS] = useLocalStorage<DoneRecipeType[]>('doneRecipes', []);
  const { startNewRecipe, progress: inProgressRecipes } = useInProgressContext();
  if (doneRecipesLS.some((doneRecipe) => doneRecipe.id === id)) return '';

  const ContinueOrStart = (inProgressRecipes[recipeType]
    && inProgressRecipes[recipeType][id])
    ? 'Continue Recipe' : 'Start Recipe';

  const handleClick = () => {
    if (/start/i.test(ContinueOrStart)) {
      startNewRecipe(recipeType, id || '');
      navigate(`/${recipeType}/${id}/in-progress`);
    }
  };

  return (
    <BottomFixedBtn data-testid="start-recipe-btn" onClick={ handleClick }>
      { ContinueOrStart }
    </BottomFixedBtn>
  );
}

export default ButtonStartOrContinue;
