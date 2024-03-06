import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Video from '../../components/Video';
import Title from '../../components/Title';
import { RecipeOptionsType } from '../../@types/RecipeOptionsType';
import useFetch from '../../hooks/useFetch';
import IngredientsCheckBox from '../../components/IngredientsCheckBox';

function RecipeInProgress() {
  const { id } = useParams();
  const location = useLocation();
  const recipeType : RecipeOptionsType = location.pathname
    .includes('meals') ? 'meals' : 'drinks';

  const { data } = useFetch<'id'>(id || '', recipeType, 'id');

  if (!data) return;
  return (
    <>
      <Title recipe={ data[0] } />
      <IngredientsCheckBox recipe={ data[0] } />
      <p data-testid="instructions">{data[0].instructions}</p>
      <Video recipe={ data[0] } />
      <button data-testid="finish-recipe-btn">finish recipe</button>
    </>
  );
}

export default RecipeInProgress;