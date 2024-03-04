import { useEffect, useState } from 'react';
import { DoneRecipeType } from '../../@types/DoneRecipeType';
import { useDoneRecipesContext } from '../../contexts/DoneRecipesContext';
import DoneRecipe from '../../components/DoneRecipe';
import { filterRecipesByType } from '../../utils/filterByType';
import ButtonsFilterBy from '../../components/ButtonsFilterBy';

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
    if (type !== 'all') {
      const filteredRecipesAnyTipe = filterRecipesByType(
        doneRecipesContext,
        type,
      ) as DoneRecipeType[];
      setFilteredDoneRecipes(filteredRecipesAnyTipe);
    } else {
      setFilteredDoneRecipes(doneRecipesContext);
    }
  };

  return (
    <div>
      <ButtonsFilterBy onClick={ handleFilterByType } />
      <div data-testid="all-done-recipes">
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
    </div>
  );
}

export default DoneRecipes;
