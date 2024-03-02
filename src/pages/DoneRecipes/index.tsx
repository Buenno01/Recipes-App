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
    const type = currentTarget.id.replace(/(filter-by-)|(-btn)/g, '');
    // filter (return: {type: string, [key:string]:any }[])
    if (type !== 'all') {
      const filteredRecipesAnyTipe = filterRecipesByType(doneRecipesContext, type);
      // convert to DoneRecipes[]
      const convertedFilteredRecipes = filteredRecipesAnyTipe
        .map((filteredRecipeAnyTipe) => formatToDoneRecipeType(filteredRecipeAnyTipe));
      setFilteredDoneRecipes(convertedFilteredRecipes);
    } else {
      setFilteredDoneRecipes(doneRecipesContext);
    }
  };

  return (
    <div>
      <h1>Done Recipes</h1>
      <button
        id="filter-by-all-btn"
        data-testid="filter-by-all-btn"
        onClick={ handleFilterByType }
      >
        All
      </button>
      {' | '}
      <button
        data-testid="filter-by-meal-btn"
        id="filter-by-meal-btn"
        onClick={ handleFilterByType }
      >
        Meals
      </button>
      {' | '}
      <button
        id="filter-by-drink-btn"
        data-testid="filter-by-drink-btn"
        onClick={ handleFilterByType }
      >
        Drinks
      </button>
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
