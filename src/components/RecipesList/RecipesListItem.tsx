import React from 'react';
import { Link } from 'react-router-dom';
import { AnyRecipeType } from '../../@types/AnyRecipeType';

type RecipesListItemProps = {
  recipe: AnyRecipeType;
  recipeType: string;
  index: number;
};

function RecipesListItem({ index, recipe, recipeType }: RecipesListItemProps) {
  return (
    <Link key={ recipe.name } to={ `/${recipeType}/${recipe.id}` }>
      <div data-testid={ `${index}-recipe-card` }>
        <img
          data-testid={ `${index}-card-img` }
          src={ recipe.thumb }
          alt={ recipe.name }
        />
        <p data-testid={ `${index}-card-name` }>{recipe.name}</p>
      </div>
    </Link>
  );
}

export default RecipesListItem;
