import { useDoneRecipesContext } from '../../../contexts/DoneRecipesContext';
import { RecipeOptionsType } from '../../../@types/RecipeOptionsType';

type ButtonStartOrContinueProps = {
  recipeType: RecipeOptionsType;
  id: string;
};

function ButtonStartOrContinue({ id, recipeType }: ButtonStartOrContinueProps) {
  const { doneRecipesContext } = useDoneRecipesContext();

  if (doneRecipesContext.some((doneRecipe) => doneRecipe.id === id)) return '';

  return (
    <button
      className="fixed bottom-0"
      data-testid="start-recipe-btn"
    >
      Start Recipe
    </button>
  );
}

export default ButtonStartOrContinue;
