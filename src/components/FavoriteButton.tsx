import { useLocalStorage } from '../hooks/useLocalStorage';
import { FavoriteRecipeType } from '../@types/FavoriteRecipeType';
import formatToFavoriteRecipeType from '../utils/formatToFavoriteRecipeType';
import { AnyRecipeType } from '../@types/AnyRecipeType';
import blackHearticon from '../assets/images/blackHeartIcon.svg';
import whiteHeartIcon from '../assets/images/whiteHeartIcon.svg';

type FavoriteButtonProps = {
  recipe: AnyRecipeType;
};

function FavoriteButton({ recipe }: FavoriteButtonProps) {
  const [favoriteRecipes,
    setFavoriteRecipes] = useLocalStorage<FavoriteRecipeType[]>('favoriteRecipes', []);

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

  const isFav = favoriteRecipes.some(({ id }: FavoriteRecipeType) => id === recipe.id);
  return (
    <button className="h-8 w-8" onClick={ handleFavorite }>
      <img
        className="w-full"
        data-testid="favorite-btn"
        src={ isFav ? blackHearticon : whiteHeartIcon }
        alt="Favoritar"
      />
    </button>
  );
}

export default FavoriteButton;