import { useNavigate } from 'react-router-dom';
import { DoneRecipeProps } from '../../@types/DoneRecipeType';
import { copyTextToClipBoard } from '../../utils/copyTextToClipBoard';

function DoneRecipe(props: DoneRecipeProps) {
  const nav = useNavigate();
  const { doneRecipe, index } = props;
  const url = `/${doneRecipe.type}s/${doneRecipe.id}`;
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
      <button data-testid={ `${index}-horizontal-image-btn` } onClick={ handleClick }>
        <img
          src={ doneRecipe.image }
          data-testid={ `${index}-horizontal-image` }
          alt={ doneRecipe.name }
        />
      </button>
      <p>
        <button onClick={ handleClick }>
          <span data-testid={ `${index}-horizontal-name` }>
            {doneRecipe.name}
          </span>
        </button>
      </p>
      <p data-testid={ `${index}-horizontal-top-text` }>
        {doneRecipe.type === 'meal'
          ? `${doneRecipe.nationality} - ${doneRecipe.category}`
          : `${doneRecipe.alcoholicOrNot}`}
      </p>
      <p data-testid={ `${index}-horizontal-done-date` }>{doneRecipe.doneDate}</p>
      <button
        id={ `${index}-MY-horizontal-share-btn-onclick` }
        data-testid={ `${index}-MY-horizontal-share-btn-onclick` }
        onClick={ () => copyText(url) }
      >
        <img
          id={ `${index}-horizontal-share-btn` }
          data-testid={ `${index}-horizontal-share-btn` }
          src="src/images/shareIcon.svg"
          alt="Compartilhar"
        />
        <span>Compartilhar</span>
      </button>
      <span id={ `${index}-link-copied` } />
      <p>Tags:</p>
      {
      doneRecipe.tags?.map((tagName: string, tagIndex: number) => {
        if (tagIndex >= 2) return;
        return (
          <p key={ tagName } data-testid={ `${index}-${tagName}-horizontal-tag` }>
            {tagName}
          </p>
        );
      })
}
    </div>
  );
}

export default DoneRecipe;
