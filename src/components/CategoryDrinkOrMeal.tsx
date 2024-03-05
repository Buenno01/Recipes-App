import React from 'react';
import { DoneRecipeType } from '../@types/DoneRecipeType';
import { FavoriteRecipeType } from '../@types/FavoriteRecipeType';

type CategoryDrinkOrMealProps = {
  recipe: DoneRecipeType | FavoriteRecipeType
  index: number
};
function CategoryDrinkOrMeal({ recipe, index }: CategoryDrinkOrMealProps) {
  return (
    <p data-testid={ `${index}-horizontal-top-text` }>
      {recipe.type === 'meal'
        ? `${recipe.nationality} - ${recipe.category}`
        : `${recipe.alcoholicOrNot}`}
    </p>
  );
}

export default CategoryDrinkOrMeal;
