import { useEffect, useState } from 'react';
import { DoneRecipeType } from '../../@types/DoneRecipeType';
import DoneRecipe from '../../components/DoneRecipe';
import { filterRecipesByType } from '../../utils/filterByType';
import ButtonsFilterBy from '../../components/ButtonsFilterBy';
import { useInProgressContext } from '../../contexts/InProgressContext';
import RecipesList from '../../components/RecipesList';

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
      <RecipesList.Root
        data-testid="all-done-recipes"
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
      </RecipesList.Root>
    </div>
  );
}

export default DoneRecipes;
