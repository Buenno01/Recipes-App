import { useState } from 'react';
import { AnyRecipeType } from '../@types/AnyRecipeType';
import blackHearticon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import { copyTextToClipBoard } from '../utils/copyTextToClipBoard';
import formatToFavoriteRecipeType from '../utils/formatToFavoriteRecipeType';
import { useFavoriteRecipesContext } from '../contexts/FavoriteRecipesContext';
import { FavoriteRecipeType } from '../@types/FavoriteRecipeType';

type DetailsHeaderProps = {
  recipe: AnyRecipeType;
  nameDataTestID?: string,
  categoryDataTestID?: string,
  imageDataTestID?: string,
  favoriteDataTestID?: string,
  shareDataTestID?: string,
};

function DetailsHeader({ recipe,
  favoriteDataTestID = 'favorite-btn',
  shareDataTestID = 'share-btn',
  nameDataTestID = 'recipe-title',
  categoryDataTestID = 'recipe-category',
  imageDataTestID = 'recipe-photo',
}: DetailsHeaderProps) {
  const { thumb, name, category, type } = recipe;
  const [copiedMessage, setCopiedMessage] = useState(false);
  const { favoriteRecipes, setFavoriteRecipes } = useFavoriteRecipesContext();
  const isFav = favoriteRecipes.some(({ id }: FavoriteRecipeType) => id === recipe.id);
  let alcoholic: string | null = null;
  if (type === 'drinks') {
    alcoholic = recipe.alcoholic;
  }

  const handleShare = async () => {
    const windowLocation = window.location.href;
    // console.log(windowLocation);
    await copyTextToClipBoard(windowLocation);

    setCopiedMessage(true);

    setTimeout(() => {
      setCopiedMessage(false);
    }, 500);
  };

  const handleFavorite = () => {
    const formattedRecipe = formatToFavoriteRecipeType(recipe);
    if (isFav) {
      const newFavoriteRecipes = favoriteRecipes
        .filter((favorite: FavoriteRecipeType) => favorite.id !== recipe.id);
      setFavoriteRecipes(newFavoriteRecipes);
    } else {
      setFavoriteRecipes([...favoriteRecipes, formattedRecipe]);
    }
  };
  return (
    <div className="relative w-screen h-56 overflow-hidden">
      <div className="absolute z-0 left-0 right-0 top-0 bottom-0 bg-black">
        <img
          className="absolute left-0 right-0 bottom-0 opacity-75"
          data-testid={ imageDataTestID }
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
            data-testid={ nameDataTestID }
          >
            {name}
          </h2>
        </span>
      </div>
      <div className="z-20 absolute left-0 right-0 flex justify-between">
        <span>
          <p data-testid={ categoryDataTestID }>
            {type === 'meals' && category}
            {type === 'drinks' && alcoholic}
          </p>
        </span>
        <span>
          <button onClick={ handleFavorite }>
            <img
              data-testid={ favoriteDataTestID }
              src={ isFav ? blackHearticon : whiteHeartIcon }
              alt="Favoritar"
            />
          </button>
          <button onClick={ handleShare }>
            <img
              data-testid={ shareDataTestID }
              src={ shareIcon }
              alt="Compartilhar"
            />
          </button>
        </span>
      </div>
      {
        copiedMessage
        && (
          <span
            className="absolute bottom-0 z-20 left-0 right-0 text-center text-white"
          >
            Link copied!
          </span>
        )
      }
    </div>
  );
}

export default DetailsHeader;
