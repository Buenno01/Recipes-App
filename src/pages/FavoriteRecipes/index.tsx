import { useEffect, useState } from 'react';
import { FavoriteRecipeType } from '../../@types/FavoriteRecipeType';
import FavoriteRecipe from '../../components/FavoriteRecipe';
import { filterRecipesByType } from '../../utils/filterByType';
import ButtonsFilterBy from '../../components/ButtonsFilterBy';
import { useLocalStorage } from '../../hooks/useLocalStorage';

function FavoriteRecipes() {
  const [
    favoriteRecipesLS,
    setFavoriteRecipesLS,
  ] = useLocalStorage<FavoriteRecipeType[]>('favoriteRecipes', []);

  const [filteredFavoriteRecipes,
    setFilteredFavoriteRecipes] = useState<FavoriteRecipeType[]>();

  useEffect(() => {
    setFilteredFavoriteRecipes(favoriteRecipesLS);
  }, [favoriteRecipesLS, setFavoriteRecipesLS]);

  const handleFilterByType = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { currentTarget } = event;
    const type = currentTarget.id.replace(/(filter-by-)|(-btn)/g, '');
    if (type !== 'all') {
      const filteredRecipesAnyTipe = filterRecipesByType(
        favoriteRecipesLS,
        type,
      ) as FavoriteRecipeType[];
      setFilteredFavoriteRecipes(filteredRecipesAnyTipe);
    } else {
      setFilteredFavoriteRecipes(favoriteRecipesLS);
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
