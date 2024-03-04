import { useNavigate } from 'react-router-dom';
import { FavoriteRecipeProps } from '../../@types/FavoriteRecipeType';
import { copyTextToClipBoard } from '../../utils/copyTextToClipBoard';
import ClickableHorizontalImage from '../ClickableHorizontalImage';

function FavoriteRecipe(props: FavoriteRecipeProps) {
  const nav = useNavigate();
  const { favoriteRecipe, index } = props;
  const url = `/${favoriteRecipe.type}s/${favoriteRecipe.id}`;
  const copyText = async (text: string) => {
    const span = document.getElementById(`${index}-link-copied`);
    if (span) {
      span.textContent = ` ${await copyTextToClipBoard(window.location.origin + text)}`;
    }
  };

  const handleClick = () => {
    nav(url);
  };
  return (
    <div>
      <ClickableHorizontalImage
        recipe={ favoriteRecipe }
        onClick={ handleClick }
        index={ index }
      />
      <p>
        <button onClick={ handleClick }>
          <span data-testid={ `${index}-horizontal-name` }>
            {favoriteRecipe.name}
          </span>
        </button>
      </p>
      <p data-testid={ `${index}-horizontal-top-text` }>
        {favoriteRecipe.type === 'meal'
          ? `${favoriteRecipe.nationality} - ${favoriteRecipe.category}`
          : `${favoriteRecipe.alcoholicOrNot}`}
      </p>
      <button
        data-testid={ `${index}-MY-horizontal-share-btn-onclick` }
        onClick={ () => copyText(url) }
      >
        <img
          data-testid={ `${index}-horizontal-share-btn` }
          src="src/images/shareIcon.svg"
          alt="Compartilhar"
        />
        <span>Compartilhar</span>
      </button>
      <span id={ `${index}-link-copied` } />
    </div>
  );
}

export default FavoriteRecipe;
