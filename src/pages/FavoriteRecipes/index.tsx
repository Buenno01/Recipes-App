import { useEffect, useState } from 'react';
import { FavoriteRecipeType } from '../../@types/FavoriteRecipeType';
import { useFavoriteRecipesContext } from '../../contexts/FavoriteRecipesContext';
import FavoriteRecipe from '../../components/FavoriteRecipe';
import { filterRecipesByType } from '../../utils/filterByType';
import ButtonsFilterBy from '../../components/ButtonsFilterBy';
import { FAVORITE_RECIPE_MOCK } from '../../tests/favoriRecipesMock';

function FavoriteRecipes() {
  const { favoriteRecipes } = useFavoriteRecipesContext();
  const [filteredFavoriteRecipes,
    setFilteredFavoriteRecipes] = useState<FavoriteRecipeType[]>(FAVORITE_RECIPE_MOCK);

  useEffect(() => {
    setFilteredFavoriteRecipes(FAVORITE_RECIPE_MOCK);
  }, [favoriteRecipes]);

  const handleFilterByType = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { currentTarget } = event;
    const type = currentTarget.id.replace(/(filter-by-)|(-btn)/g, '');
    if (type !== 'all') {
      const filteredRecipesAnyTipe = filterRecipesByType(
        favoriteRecipes,
        type,
      ) as FavoriteRecipeType[];
      setFilteredFavoriteRecipes(filteredRecipesAnyTipe);
    } else {
      setFilteredFavoriteRecipes(favoriteRecipes);
    }
  };

  return (
    <div>
      <ButtonsFilterBy onClick={ handleFilterByType } />
      {
        filteredFavoriteRecipes && filteredFavoriteRecipes
          .map((filteredFavoriteRecipe: FavoriteRecipeType, index: number) => {
            return (
              <div key={ filteredFavoriteRecipe.id }>
                <FavoriteRecipe
                  favoriteRecipe={ filteredFavoriteRecipe }
                  index={ index }
                />
              </div>
            );
          })
      }
    </div>
  );
}

export default FavoriteRecipes;
