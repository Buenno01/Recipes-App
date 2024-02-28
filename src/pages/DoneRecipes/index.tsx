import React, { useEffect, useState } from 'react';
import { DoneRecipeType } from '../../@types/DoneRecipeType';
import DoneRecipe from '../../components/DoneRecipe';
import { DONE_RECIPES_MOCK } from '../../tests/mock';


function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState<DoneRecipeType[]>(DONE_RECIPES_MOCK);

  useEffect(() => {
    const doneRecipesLocalStorage = localStorage.getItem('doneRecipes');
    if (doneRecipesLocalStorage) {
      const jsonDoneRecipe = JSON.parse(doneRecipesLocalStorage);
      setDoneRecipes(jsonDoneRecipe);
      applyFilters(jsonDoneRecipe);
    }
    applyFilters(doneRecipes);
  }, []);

  const applyFilters = (doneRecipesToFilter: DoneRecipeType[]) => {
    // const filterN = document.getFiltersN
    console.log(doneRecipesToFilter);
    // filteredDoneRecipes = filterLogic();
    // setDoneRecipes(filteredDoneRecipes);
  };

  return (
    <div>
      <h1>Done Recipes</h1>
      {
      // <Filter />
      }
      {
        doneRecipes.map((doneRecipe: DoneRecipeType, index: number) => {
          return (
            <div key={ doneRecipe.id }>
              {
                <DoneRecipe doneRecipe={ doneRecipe } index={ index } />
                // <DoneRecipe recipe={doneRecipe}/>
              }
            </div>
          );
        })
      }
    </div>
  );
}

export default DoneRecipes;
