import { useNavigate } from 'react-router-dom';
import { useDoneRecipesContext } from '../../../contexts/DoneRecipesContext';
import { RecipeOptionsType } from '../../../@types/RecipeOptionsType';

type ButtonStartOrContinueProps = {
  recipeType: RecipeOptionsType;
  id: string | undefined;
  ingredientList: string[];
};

function ButtonStartOrContinue({ id = '', recipeType,
  ingredientList }: ButtonStartOrContinueProps) {
  const navigate = useNavigate();
  const { doneRecipesContext } = useDoneRecipesContext();
  if (doneRecipesContext.some((doneRecipe) => doneRecipe.id === id)) return '';

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
