import React from 'react';
import { useParams } from 'react-router-dom';
import useFetchDrinkOrFoodById from '../../services/useFetchDrinkOrFoodById';
import { RecipeOptionsType } from '../../@types/RecipeOptionsType';

function Details() {
  const { id, recipeType } = useParams();
  const {
    recipe,
    loading,
    error,
  } = useFetchDrinkOrFoodById(id || '', recipeType as RecipeOptionsType);

  return (
    <div>
      Details
      <p>
        {recipe?.id}
      </p>
    </div>
  );
}

export default Details;
