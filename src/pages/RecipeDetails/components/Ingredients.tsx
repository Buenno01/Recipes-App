import React from 'react';
import IngredientList from '../../../components/IngredientList';

type IngredientsProps = {
  recipe: {
    ingredients: string[];
    measures: string[];
  };
};

function Ingredients({ recipe: { ingredients, measures } }: IngredientsProps) {
  return (
    <IngredientList.Root>
      {
      ingredients.map((ingredient, index) => {
        const measure = measures[index];
        return (
          <IngredientList.Item
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

export default Ingredients;
