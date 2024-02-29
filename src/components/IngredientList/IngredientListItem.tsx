import React from 'react';

type IngredientListItemProps = {
  ingredient: string;
  measure: string;
  index: number;
};

function IngredientListItem({ ingredient, measure, index }: IngredientListItemProps) {
  return (
    <li
      data-testid={ `${index}-ingredient-name-and-measure` }
      className="flex gap-2"
    >
      <input type="checkbox" name={ `ingredient-${ingredient}` } value={ ingredient } />
      <p>
        {measure ? `${measure} - ` : ''}
        {ingredient}
      </p>
    </li>
  );
}

export default IngredientListItem;
