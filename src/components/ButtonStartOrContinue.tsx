import { useNavigate } from 'react-router-dom';
import { RecipeOptionsType } from '../@types/RecipeOptionsType';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { DoneRecipeType } from '../@types/DoneRecipeType';

type ButtonStartOrContinueProps = {
  recipeType: RecipeOptionsType;
  id: string | undefined;
  ingredientList: string[];
};

function ButtonStartOrContinue({ id = '', recipeType,
  ingredientList }: ButtonStartOrContinueProps) {
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
          [id]: ingredientList,
        },
      }));

      navigate(`/${recipeType}/${id}/in-progress`);
    }
  };

  return (
    <button
      className="fixed bottom-0"
      data-testid="start-recipe-btn"
      onClick={ handleClick }
    >
      {
        isInProgress
      }
    </button>
  );
}

export default ButtonStartOrContinue;
