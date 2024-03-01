import React, { useState } from 'react';
import { AnyRecipeType } from '../../../@types/AnyRecipeType';
import blackHearticon from '../../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../../images/whiteHeartIcon.svg';
import shareIcon from '../../../images/shareIcon.svg';
import { copyTextToClipBoard } from '../../../utils/copyTextToClipBoard';

type DetailsHeaderProps = {
  recipe: AnyRecipeType;
};

function DetailsHeader({ recipe }: DetailsHeaderProps) {
  const { thumb, name, category, type } = recipe;
  let alcoholic: string | null = null;
  if (type === 'drinks') {
    alcoholic = recipe.alcoholic;
  }

  const handleShare = async () => {
    const windowLocation = window.location.href;
    console.log(windowLocation);
    const message = await copyTextToClipBoard(windowLocation);
    const messageElement = document.querySelector('#details-header-message');
    messageElement?.appendChild(message);
    setTimeout(() => {
      messageElement?.removeChild(message);
    }, 500);
  };
  return (
    <div className="relative w-screen h-56 overflow-hidden">
      <div className="absolute z-0 left-0 right-0 top-0 bottom-0 bg-black">
        <img
          className="absolute left-0 right-0 bottom-0 opacity-75"
          data-testid="recipe-photo"
          src={ thumb }
          alt={ name }
        />
        <span
          className="absolute top-0 bottom-0 left-0
        right-0 flex justify-center items-center"
        >
          <h2
            className="text-white text-4xl font-bold
           text-center"
            data-testid="recipe-title"
          >
            {name}
          </h2>
        </span>
      </div>
      <div className="z-20 absolute left-0 right-0 flex justify-between">
        <span>
          <p data-testid="recipe-category">
            {type === 'meals' && category}
            {type === 'drinks' && alcoholic}
          </p>
        </span>
        <span>
          <button>
            <img data-testid="favorite-btn" src={ blackHearticon } alt="Favoritar" />
          </button>
          <button onClick={ handleShare }>
            <img
              data-testid="share-btn"
              src={ shareIcon }
              alt="Compartilhar"
            />
          </button>
        </span>
      </div>
      <span
        className="absolute bottom-0 z-20 left-0 right-0 text-center text-white"
        id="details-header-message"
      />
    </div>
  );
}

export default DetailsHeader;
