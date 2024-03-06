import React, { ChangeEvent, useState } from 'react';
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
  const [inProgress, setInProgress] = useLocalStorage(
    'inProgressRecipes',
    { drinks: {}, meals: {} },
  );
  const thisProgress = inProgress[recipeType][id]
    ? inProgress[recipeType][id] : [];
  const INITIAL_STATE = !!thisProgress.includes(ingredient);
  const [isChecked, setIsChecked] = useState(INITIAL_STATE);

  const handleChange = () => {
    if (!isChecked) {
      setInProgress({ ...inProgress,
        [recipeType]: { ...inProgress[recipeType],
          [id]: [...thisProgress, ingredient] } });
    } else {
      setInProgress({ ...inProgress,
        [recipeType]: { ...inProgress[recipeType],
          [id]: thisProgress.filter((i : string) => i !== ingredient) } });
    }
    setIsChecked(!isChecked);
  };
  return (
    <li>
      {location.pathname.includes('in-progress') ? (
        <label
          data-testid={ `${index}-ingredient-step` }
          className={ `flex gap-2 ${isChecked && 'line-through'}` }
        >
          <input
            type="checkbox"
            name={ `ingredient-${ingredient}` }
            value={ ingredient }
            checked={ isChecked }
            onChange={ handleChange }
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
