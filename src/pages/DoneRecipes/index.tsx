import { useContext, useEffect, useState } from 'react';
import { DoneRecipeType } from '../../@types/DoneRecipeType';
import DoneRecipe from '../../components/DoneRecipe';
import { filterRecipesByType } from '../../utils/filterByType';
import ButtonsFilterBy from '../../components/ButtonsFilterBy';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useInProgressContext } from '../../contexts/InProgressContext';

function DoneRecipes() {
  /* const [doneRecipes,
    setDoneRecipes] = useLocalStorage<DoneRecipeType[]>('doneRecipes', []); */
  const { doneRecipes } = useInProgressContext();

  const [filteredDoneRecipes,
    setFilteredDoneRecipes] = useState<DoneRecipeType[]>(doneRecipes);

  useEffect(() => {
    setFilteredDoneRecipes(doneRecipes);
  }, [doneRecipes]);

  const handleFilterByType = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { currentTarget } = event;
    const type = currentTarget.id.replace(/(filter-by-)|(-btn)/g, '');
    if (type !== 'all') {
      const filteredRecipesAnyTipe = filterRecipesByType(
        doneRecipes,
        type,
      ) as DoneRecipeType[];
      setFilteredDoneRecipes(filteredRecipesAnyTipe);
    } else {
      setFilteredDoneRecipes(doneRecipes);
    }
  };

  return (
    <div>
      <ButtonsFilterBy onClick={ handleFilterByType } />
      <div
        data-testid="all-done-recipes"
        className="mx-4"
      >
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
