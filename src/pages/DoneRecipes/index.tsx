import { useContext, useEffect, useState } from 'react';
import { DoneRecipeType } from '../../@types/DoneRecipeType';
import DoneRecipe from '../../components/DoneRecipe';
import { DoneRecipeContext } from '../../contexts/DoneRecipeContext';
import { doneRecipesMock } from '../../tests/mock';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState<DoneRecipeType[] | null>([]);
  const doneRecipeContext = useContext(DoneRecipeContext);
  doneRecipeContext.setDoneRecipesContext(doneRecipesMock);

  // const applyFilters = (doneRecipesToFilter: DoneRecipeType[]) => {
  // const filteredDoneRecipes = Lógica de Filtro
  // return filteredDoneRecipes
  // };

  useEffect(() => {
    // const filteredDoneRecipes = applyFilters(doneRecipeContext.doneRecipes);
    // setDoneRecipes(filteredDoneRecipes);
    // doneRecipeContext.setDoneRecipesContext(filteredDoneRecipes);
    setDoneRecipes(doneRecipeContext.doneRecipes);
  }, [doneRecipeContext]);

  return (
    <div>
      <h1>Done Recipes</h1>
      {// <Filter ></Filter> !LÓGICA FUTURA
      }
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
