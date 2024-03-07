import { useEffect, useState } from 'react';
import { DoneRecipeType } from '../../@types/DoneRecipeType';
import DoneRecipe from '../../components/DoneRecipe';
import { filterRecipesByType } from '../../utils/filterByType';
import ButtonsFilterBy from '../../components/ButtonsFilterBy';
import { useLocalStorage } from '../../hooks/useLocalStorage';

function DoneRecipes() {
  const [doneRecipesLS,
    setDoneRecipesLS] = useLocalStorage<DoneRecipeType[]>('doneRecipes', []);
  const [filteredDoneRecipes,
    setFilteredDoneRecipes] = useState<DoneRecipeType[]>(doneRecipesLS);

  useEffect(() => {
    setFilteredDoneRecipes(doneRecipesLS);
  }, [doneRecipesLS, setDoneRecipesLS]);

  const handleFilterByType = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { currentTarget } = event;
    const type = currentTarget.id.replace(/(filter-by-)|(-btn)/g, '');
    if (type !== 'all') {
      const filteredRecipesAnyTipe = filterRecipesByType(
        doneRecipesLS,
        type,
      ) as DoneRecipeType[];
      setFilteredDoneRecipes(filteredRecipesAnyTipe);
    } else {
      setFilteredDoneRecipes(doneRecipesLS);
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
