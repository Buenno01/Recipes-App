import { useNavigate } from 'react-router-dom';
import { DoneRecipeProps } from '../../@types/DoneRecipeType';
import { copyTextToClipBoard } from '../../utils/copyTextToClipBoard';
import ClickableHorizontalImage from '../ClickableHorizontalImage';

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
      <ClickableHorizontalImage
        recipe={ doneRecipe }
        onClick={ handleClick }
        index={ index }
      />
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
