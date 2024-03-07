import { AnyRecipeType } from '../@types/AnyRecipeType';
import blackHearticon from '../assets/images/blackHeartIcon.svg';
import whiteHeartIcon from '../assets/images/whiteHeartIcon.svg';
import formatToFavoriteRecipeType from '../utils/formatToFavoriteRecipeType';
import { FavoriteRecipeType } from '../@types/FavoriteRecipeType';
import ShareButton from './ShareButton';
import { useLocalStorage } from '../hooks/useLocalStorage';

type DetailsHeaderProps = {
  recipe: AnyRecipeType;
};

function DetailsHeader({ recipe }: DetailsHeaderProps) {
  const { thumb, name, category, type } = recipe;
  const [favoriteRecipes,
    setFavoriteRecipes] = useLocalStorage<FavoriteRecipeType[]>('favoriteRecipes', []);
  const isFav = favoriteRecipes.some(({ id }: FavoriteRecipeType) => id === recipe.id);
  let alcoholic: string | null = null;
  if (type === 'drinks') {
    alcoholic = recipe.alcoholic;
  }

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
          <button onClick={ handleFavorite }>
            <img
              data-testid="favorite-btn"
              src={ isFav ? blackHearticon : whiteHeartIcon }
              alt="Favoritar"
            />
          </button>
          <ShareButton
            dataTestID="share-btn"
            alt="Compartilhar"
            copyText={ window.location.href }
          />
        </span>
      </div>
    </div>
  );
}

export default DetailsHeader;
