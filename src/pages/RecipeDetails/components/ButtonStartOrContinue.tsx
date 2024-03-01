import { useDoneRecipesContext } from '../../../contexts/DoneRecipesContext';
import { RecipeOptionsType } from '../../../@types/RecipeOptionsType';

type ButtonStartOrContinueProps = {
  recipeType: RecipeOptionsType;
  id: string | undefined;
};

function ButtonStartOrContinue({ id = '', recipeType }: ButtonStartOrContinueProps) {
  const { doneRecipesContext } = useDoneRecipesContext();
  if (doneRecipesContext.some((doneRecipe) => doneRecipe.id === id)) return '';

  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes') || '{}');

  const isInProgress = !!(inProgressRecipes[recipeType]
    && inProgressRecipes[recipeType][id]);

  // console.log(isInProgress[recipeType][id]);

  return (
    <button
      className="fixed bottom-0"
      data-testid="start-recipe-btn"
    >
      {
        isInProgress
          ? 'Continue Recipe'
          : 'Start Recipe'
      }
    </button>
  );
}

export default ButtonStartOrContinue;
