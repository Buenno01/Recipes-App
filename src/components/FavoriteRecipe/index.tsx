import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FavoriteRecipeProps } from '../../@types/FavoriteRecipeType';
import blackHearticon from '../../images/blackHeartIcon.svg';
import ShareButton from '../ShareButton';
import ClickableImage from '../ClickableImage';
import CategoryAndName from '../CategoryAndName';

function FavoriteRecipe(props: FavoriteRecipeProps) {
  const nav = useNavigate();
  const { favoriteRecipe, index, favoriteRecipesLS, setFavoriteRecipesLS } = props;
  const url = `/${favoriteRecipe.type}s/${favoriteRecipe.id}`;

  const [isFav, setIsFav] = useState(true);

  const handleClick = () => {
    nav(url);
  };

  const handleFavorite = () => {
    const newFavoriteRecipes = favoriteRecipesLS
      .filter(
        (favoriteRecipeElement: any) => favoriteRecipeElement.id !== favoriteRecipe.id,
      );
    setFavoriteRecipesLS(newFavoriteRecipes);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    setIsFav(false);
  };

  return (
    isFav
    && (
      <div className="flex h-48 mb-4 border border-gray-400">
        <div className="w-1/2 h-full flex-shrink-0">
          <ClickableImage
            recipe={ favoriteRecipe }
            onClick={ handleClick }
            index={ index }
          />
        </div>
        <div className="w-1/2 pt-4 text-left pl-4 flex-col">
          <CategoryAndName
            onClick={ handleClick }
            recipe={ favoriteRecipe }
            index={ index }
          />

          <div className="flex items-end pt-16 space-x-4">
            <ShareButton
              alt="Compatilhar"
              dataTestID={ `${index}-horizontal-share-btn` }
              copyText={ window.location.origin + url }
            />
            <button
              data-testid={ `${index}-horizontal-favorite-true-btn` }
              onClick={ handleFavorite }
            >
              <img
                data-testid={ `${index}-horizontal-favorite-btn` }
                src={ blackHearticon }
                alt="Favoritar"
                className="h-8"
              />
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default FavoriteRecipe;
