import { useContext, useEffect, useState } from 'react';
import { DoneRecipeType } from '../../@types/DoneRecipeType';
import DoneRecipe from '../../components/DoneRecipe';
import { DoneRecipeContext } from '../../contexts/DoneRecipeContext';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState<DoneRecipeType[]>([]);
  const doneRecipeContext = useContext(DoneRecipeContext);

  const applyFilters = (doneRecipesToFilter: DoneRecipeType[]) => {
    const filteredDoneRecipes: DoneRecipeType[] = [];
    // const filterN = document.getFiltersN
    // filteredDoneRecipes = filterLogic();
    // setDoneRecipes(filteredDoneRecipes);
    return filteredDoneRecipes;
  };

  useEffect(() => {
    const filteredDoneRecipes = applyFilters(doneRecipeContext.doneRecipes);
    setDoneRecipes(filteredDoneRecipes);
  }, [doneRecipeContext]);

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
