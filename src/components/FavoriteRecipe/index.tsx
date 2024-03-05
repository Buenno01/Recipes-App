import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FavoriteRecipeProps, FavoriteRecipeType } from '../../@types/FavoriteRecipeType';
import blackHearticon from '../../images/blackHeartIcon.svg';
import ShareButton from '../ShareButton';
import ClickableImageAndName from '../ClickableImageAndName';
import CategoryDrinkOrMeal from '../CategoryDrinkOrMeal';
import { useLocalStorage } from '../../hooks/useLocalStorage';

function FavoriteRecipe(props: FavoriteRecipeProps) {
  const nav = useNavigate();
  const { favoriteRecipe, index } = props;
  const url = `/${favoriteRecipe.type}s/${favoriteRecipe.id}`;
  const [favoriteRecipes, setFavoriteRecipes] = useLocalStorage('favoriteRecipes', []);
  const [isFav, setIsFav] = useState(true);

  const handleClick = () => {
    nav(url);
  };

  const handleFavorite = () => {
    const newFavoriteRecipes = favoriteRecipes
      .filter((favoriteRecipeElement: FavoriteRecipeType) => favoriteRecipeElement
        .id !== favoriteRecipe.id);
    setFavoriteRecipes(newFavoriteRecipes);
    setIsFav(false);
  };

  return (
    isFav
    && (
      <div>
        <ClickableImageAndName
          recipe={ favoriteRecipe }
          onClick={ handleClick }
          index={ index }
        />
        <CategoryDrinkOrMeal recipe={ favoriteRecipe } index={ index } />
        <button
          data-testid={ `${index}-horizontal-favorite-true-btn` }
          onClick={ handleFavorite }
        >
          <img
            data-testid={ `${index}-horizontal-favorite-btn` }
            src={ blackHearticon }
            alt="Favoritar"
          />
        </button>
        <ShareButton
          alt="Compatilhar"
          dataTestID={ `${index}-horizontal-share-btn` }
          copyText={ window.location.origin + url }
        />
      </div>)
  );
}

export default FavoriteRecipe;
