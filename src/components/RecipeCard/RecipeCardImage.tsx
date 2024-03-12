import React from 'react';

type RecipeCardImageProps = {
  index: number,
  name: string,
  onClick: () => void,
  source: string
};

function RecipeCardImage({ index, name, onClick, source }: RecipeCardImageProps) {
  return (
    <button
      className="h-full w-1/2 relative"
      data-testid={ `${index}-horizontal-image-btn` }
      onClick={ onClick }
    >
      <img
        className="absolute inset-0 w-full h-full object-cover"
        alt={ name }
        data-testid={ `${index}-horizontal-image` }
        src={ source }
      />
    </button>
  );
}

export default RecipeCardImage;
