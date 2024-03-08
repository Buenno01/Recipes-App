import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useInProgressContext } from '../../contexts/InProgressContext';

type IngredientListCheckBoxProps = {
  ingredient: string;
  measure: string;
  index: number;
};

function IngredientListCheckBox({ ingredient, measure, index }:
IngredientListCheckBoxProps) {
  const { id } = useParams();
  const location = useLocation();
  const recipeType = location.pathname.includes('meals') ? 'meals' : 'drinks';
  const { progress, addIngredient, removeIngredient } = useInProgressContext();
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    if (isChecked) {
      removeIngredient(recipeType, id || '', ingredient);
    } else {
      addIngredient(recipeType, id || '', ingredient);
    }
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    if (id && progress[recipeType][id].includes(ingredient)) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, []);
  return (
    <li>

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

    </li>
  );
}

export default IngredientListCheckBox;
