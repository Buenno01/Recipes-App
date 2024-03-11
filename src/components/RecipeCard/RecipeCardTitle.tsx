import React from 'react';
import { DoneRecipeType } from '../../@types/DoneRecipeType';
import { FavoriteRecipeType } from '../../@types/FavoriteRecipeType';
import CategoryDrinkOrMeal from '../CategoryDrinkOrMeal';

type RecipeCardTitleProps = {
  onClick: () => void,
  index: number,
  recipe: DoneRecipeType | FavoriteRecipeType
};

function RecipeCardTitle({ onClick, index, recipe }: RecipeCardTitleProps) {
  return (
    <div className="flex flex-col">
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
    </div>
  );
}

export default RecipeCardTitle;
