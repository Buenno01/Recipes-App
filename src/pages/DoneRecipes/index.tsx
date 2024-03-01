import { useEffect, useState } from 'react';
import { DoneRecipeType } from '../../@types/DoneRecipeType';
import DoneRecipe from '../../components/DoneRecipe';
import { useDoneRecipesContext } from '../../contexts/DoneRecipesContext';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState<DoneRecipeType[]>([]);
  const { doneRecipesContext } = useDoneRecipesContext();

  useEffect(() => {
    setDoneRecipes(doneRecipesContext);
  }, [doneRecipesContext]);

  return (
    <div>
      <h1>Done Recipes</h1>
      <button data-testid="filter-by-all-btn">All</button>
      <button data-testid="filter-by-meal-btn">Meals</button>
      <button data-testid="filter-by-drink-btn">Drinks</button>
      {
        doneRecipes && doneRecipes.map((doneRecipe: DoneRecipeType, index: number) => {
          return (
            <div key={ doneRecipe.id }>
              <DoneRecipe doneRecipe={ doneRecipe } index={ index } />
            </div>
          );
        })
      }
    </div>
  );
}

export default DoneRecipes;
