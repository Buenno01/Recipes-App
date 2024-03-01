import { useEffect, useState } from 'react';
import { DoneRecipeType } from '../../@types/DoneRecipeType';
import { useDoneRecipesContext } from '../../contexts/DoneRecipesContext';
import DoneRecipe from '../../components/DoneRecipe';
import { filterRecipesByType } from '../../utils/filterByType';
import { formatToDoneRecipeType } from '../../utils/formatToDoneRecipeType';

function DoneRecipes() {
  const { doneRecipesContext } = useDoneRecipesContext();
  const [filteredDoneRecipes,
    setFilteredDoneRecipes] = useState<DoneRecipeType[]>(doneRecipesContext);

  useEffect(() => {
    setFilteredDoneRecipes(doneRecipesContext);
  }, [doneRecipesContext]);

  const handleFilterByType = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { currentTarget } = event;
    const type = currentTarget.id.replace(/^filter-by-|btn$/g, '');
    // filter (return: {type: string, [key:string]:any }[])
    const filteredRecipesAnyTipe = filterRecipesByType(doneRecipesContext, type);
    // convert to DoneRecipes[]
    const convertedFilteredRecipes = filteredRecipesAnyTipe
      .map((filteredRecipeAnyTipe) => formatToDoneRecipeType(filteredRecipeAnyTipe));
    setFilteredDoneRecipes(convertedFilteredRecipes);
  };
  return (
    <div>
      <h1>Done Recipes</h1>
      <button data-testid="filter-by-all-btn">All</button>
      <button
        data-testid="filter-by-meal-btn"
        id="filter-meals-btn"
        onClick={ handleFilterByType }
      >
        Meals
      </button>
      <button data-testid="filter-by-drink-btn">Drinks</button>
      {
        filteredDoneRecipes && filteredDoneRecipes
          .map((filteredDoneRecipe: DoneRecipeType, index: number) => {
            return (
              <div key={ filteredDoneRecipe.id }>
                <DoneRecipe doneRecipe={ filteredDoneRecipe } index={ index } />
              </div>
            );
          })
      }
    </div>
  );
}

export default DoneRecipes;
