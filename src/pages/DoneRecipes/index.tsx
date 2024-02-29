import { useContext, useEffect, useState } from 'react';
import { DoneRecipeType } from '../../@types/DoneRecipeType';
import DoneRecipe from '../../components/DoneRecipe';
import { DoneRecipeContext } from '../../contexts/DoneRecipeContext';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState<DoneRecipeType[]>([]);
  const doneRecipeContext = useContext(DoneRecipeContext);

  const applyFilters = (doneRecipesToFilter: DoneRecipeType[]) => {
    // const filterN = document.getFiltersN
    console.log(doneRecipesToFilter);
    // filteredDoneRecipes = filterLogic();
    // setDoneRecipes(filteredDoneRecipes);
  };

  useEffect(() => {
    applyFilters(doneRecipeContext.doneRecipes);
    setDoneRecipes(doneRecipeContext.doneRecipes);
  }, []);

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
