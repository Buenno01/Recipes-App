import { useEffect, useState } from 'react';
import { FavoriteRecipeType } from '../../@types/FavoriteRecipeType';
import FavoriteRecipe from '../../components/FavoriteRecipe';
import { filterRecipesByType } from '../../utils/filterByType';
import ButtonsFilterBy from '../../components/ButtonsFilterBy';

function FavoriteRecipes() {
  const [favoriteRecipesLS, setFavoriteRecipesLS,
  ] = useState<FavoriteRecipeType[]>(() => {
    const fav = localStorage.getItem('favoriteRecipes');
    if (fav) return JSON.parse(fav);
    return [];
  });

  const [filteredFavoriteRecipes,
    setFilteredFavoriteRecipes] = useState<FavoriteRecipeType[]>(favoriteRecipesLS);

  useEffect(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipesLS));
  }, [favoriteRecipesLS]);

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
      <div data-testid="all-favorite-recipes" className="mx-4">
        {
        filteredFavoriteRecipes && filteredFavoriteRecipes
          .map((filteredFavoriteRecipe: FavoriteRecipeType, index: number) => {
            return (
              <FavoriteRecipe
                favoriteRecipe={ filteredFavoriteRecipe }
                index={ index }
                favoriteRecipesLS={ favoriteRecipesLS }
                setFavoriteRecipesLS={ setFavoriteRecipesLS }
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
