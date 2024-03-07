import React from 'react';
import CategoryDrinkOrMeal from './CategoryDrinkOrMeal';
import { FavoriteRecipeType } from '../@types/FavoriteRecipeType';
import { DoneRecipeType } from '../@types/DoneRecipeType';

type CategoryAndNameProps = {
  onClick: () => void,
  index: number,
  recipe: DoneRecipeType | FavoriteRecipeType
};
function CategoryAndName({ onClick, index, recipe }: CategoryAndNameProps) {
  return (
    <>
      <button onClick={ onClick }>
        <p data-testid={ `${index}-horizontal-name` } className="font-bold text-left">
          {recipe.name}
        </p>
      </button>
      <CategoryDrinkOrMeal
        recipe={ recipe }
        index={ index }
        className="text-sm text-gray-500 text-left"
      />
    </>
  );
}

export default CategoryAndName;
