import React from 'react';
import IngredientList from './IngredientList';

type IngredientsProps = {
  recipe: {
    ingredients: string[];
    measures: string[];
  };
};

function IngredientsCheckBox({ recipe: { ingredients, measures } }: IngredientsProps) {
  return (
    <IngredientList.Root>
      {
      ingredients.map((ingredient, index) => {
        const measure = measures[index];
        return (
          <IngredientList.CheckBox
            key={ index }
            ingredient={ ingredient }
            measure={ measure }
            index={ index }
          />
        );
      })
    }
    </IngredientList.Root>
  );
}

export default IngredientsCheckBox;
