import React, { useEffect, useState } from 'react';
import { useFavoriteRecipesContext } from '../../contexts/FavoriteRecipesContext';
import { FavoriteRecipeType } from '../../@types/FavoriteRecipeType';
import { filterRecipesByType } from '../../utils/filterByType';
import ButtonsFilterBy from '../../components/ButtonsFilterBy';

function FavoriteRecipes() {
  const { favoriteRecipes } = useFavoriteRecipesContext();
  const [filteredFavoriteRecipes,
    setFilteredFavoriteRecipes] = useState<FavoriteRecipeType[]>(favoriteRecipes);
  useEffect(() => {
    setFilteredFavoriteRecipes(favoriteRecipes);
  }, [favoriteRecipes]);

  const handleFilterByType = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { currentTarget } = event;
    const type = currentTarget.id.replace(/(filter-by-)|(-btn)/g, '');
    if (type !== 'all') {
      const filteredRecipes = filterRecipesByType(
        favoriteRecipes,
        type,
      ) as FavoriteRecipeType[];
      setFilteredFavoriteRecipes(filteredRecipes);
    } else {
      setFilteredFavoriteRecipes(favoriteRecipes);
    }
  };

  return (
    <>
      <ButtonsFilterBy onClick={ handleFilterByType } />
      {
      filteredFavoriteRecipes
        .map(
          (filteredFavoriteRecipe) => filteredFavoriteRecipe.name,
        )
      }
    </>
  );
}

export default FavoriteRecipes;
