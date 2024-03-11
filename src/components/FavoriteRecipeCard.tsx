import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import RecipeCard from './RecipeCard';
import ShareButton from './ShareButton';
import { FavoriteRecipeType } from '../@types/FavoriteRecipeType';
import FavoriteButton from './FavoriteButton';

type FavoriteRecipeCardProps = {
  favoriteRecipe: FavoriteRecipeType,
  index: number,
  favoriteRecipesLS: FavoriteRecipeType[],
  setFavoriteRecipesLS: (newFavoriteRecipes: FavoriteRecipeType[]) => void,
};
function FavoriteRecipeCard({ favoriteRecipe, favoriteRecipesLS, index,
  setFavoriteRecipesLS }: FavoriteRecipeCardProps) {
  const nav = useNavigate();
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
    isFav && (
      <RecipeCard.Root>
        <RecipeCard.Image
          index={ index }
          name={ favoriteRecipe.name }
          onClick={ handleClick }
          source={ favoriteRecipe.image }
        />
        <RecipeCard.Content>
          <RecipeCard.Wrapper>
            <RecipeCard.Title
              index={ index }
              onClick={ handleClick }
              recipe={ favoriteRecipe }
            />
          </RecipeCard.Wrapper>
          <RecipeCard.Wrapper className="justify-start gap-4">
            <ShareButton
              alt="Compatilhar"
              copyText={ window.location.origin + url }
              dataTestID={ `${index}-horizontal-share-btn` }
            />
            <button
              onClick={ handleFavorite }
              data-testid={ `${index}-horizontal-favorite-btn` }
            >
              <FavoriteButton recipe={ favoriteRecipe } />
            </button>
          </RecipeCard.Wrapper>
        </RecipeCard.Content>
      </RecipeCard.Root>
    )
  );
}

export default FavoriteRecipeCard;
