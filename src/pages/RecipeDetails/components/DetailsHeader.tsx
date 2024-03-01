import React from 'react';
import { AnyRecipeType } from '../../../@types/AnyRecipeType';

type DetailsHeaderProps = {
  recipe: AnyRecipeType;
};

function DetailsHeader({ recipe }: DetailsHeaderProps) {
  const { thumb, name, category, type } = recipe;
  let alcoholic: string | null = null;
  if (type === 'drinks') {
    alcoholic = recipe.alcoholic;
  }
  return (
    <>
      <img data-testid="recipe-photo" src={ thumb } alt={ name } />
      <h2 data-testid="recipe-title">{name}</h2>
      <p data-testid="recipe-category">
        {type === 'meals' && category}
        {type === 'drinks' && alcoholic}
      </p>
    </>
  );
}

export default DetailsHeader;
