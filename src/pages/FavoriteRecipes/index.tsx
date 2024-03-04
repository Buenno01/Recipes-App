import { useEffect, useState } from 'react';
import { FavoriteRecipeType } from '../../@types/FavoriteRecipeType';
import { useFavoriteRecipesContext } from '../../contexts/FavoriteRecipesContext';
import FavoriteRecipe from '../../components/FavoriteRecipe';
import { filterRecipesByType } from '../../utils/filterByType';
import ButtonsFilterBy from '../../components/ButtonsFilterBy';
// import { FAVORITE_RECIPES_MOCK } from '../../tests/mocks/favoriRecipesMock';

function FavoriteRecipes() {
  const { favoriteRecipes/* , setFavoriteRecipes */ } = useFavoriteRecipesContext();
  const [filteredFavoriteRecipes,
    setFilteredFavoriteRecipes] = useState<FavoriteRecipeType[]>();

  useEffect(() => {
    // setFavoriteRecipes(FAVORITE_RECIPES_MOCK);
    setFilteredFavoriteRecipes(favoriteRecipes);
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
      <ButtonsFilterBy onClick={ handleFilterByType } data-testid="filterBy-buttons" />
      <div data-testid="all-favorite-recipes">
        {
        filteredFavoriteRecipes && filteredFavoriteRecipes
          .map((filteredFavoriteRecipe: FavoriteRecipeType, index: number) => {
            return (
              <FavoriteRecipe
                favoriteRecipe={ filteredFavoriteRecipe }
                index={ index }
                key={ filteredFavoriteRecipe.id }
              />
            );
          })
      }
      </div>
    </div>
  );
}

export default FavoriteRecipes;
