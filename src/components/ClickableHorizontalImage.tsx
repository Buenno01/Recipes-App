import React from 'react';

type ClickableHorizontalImageProps = {
  recipe: any,
  index?: number,
  onClick: () => void
};

function ClickableHorizontalImage(
  { onClick, recipe, index = 0 }: ClickableHorizontalImageProps,
) {
  return (
    <button data-testid={ `${index}-horizontal-image-btn` } onClick={ onClick }>
      <img
        src={ recipe.image }
        data-testid={ `${index}-horizontal-image` }
        alt={ recipe.name }
      />
    </button>
  );
}

export default ClickableHorizontalImage;
