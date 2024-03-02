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
    >
      <label className="flex gap-2">
        <input type="checkbox" name={ `ingredient-${ingredient}` } value={ ingredient } />
        {measure ? `${measure} - ` : ''}
        {ingredient}
      </label>
    </li>
  );
}

export default IngredientListItem;
