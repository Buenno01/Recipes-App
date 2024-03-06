import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/useLocalStorage';

type IngredientListItemProps = {
  ingredient: string;
  measure: string;
  index: number;
};

function IngredientListItem({ ingredient, measure, index }: IngredientListItemProps) {
  const { id } = useParams();
  const location = useLocation();
  const recipeType = location.pathname.includes('meals') ? 'meals' : 'drinks';
  const inProgress = useLocalStorage('inProgressRecipes', {});
  return (
    <li>
      {location.pathname.includes('in-progress') ? (
        <label data-testid={ `${index}-ingredient-step` } className="flex gap-2">
          <input
            type="checkbox"
            name={ `ingredient-${ingredient}` }
            value={ ingredient }
          />
          {measure ? `${measure} - ` : ''}
          {ingredient}
        </label>
      ) : (
        <p data-testid={ `${index}-ingredient-name-and-measure` }>
          {measure ? `${measure} - ` : ''}
          {ingredient}
        </p>
      ) }

    </li>
  );
}

export default IngredientListItem;
