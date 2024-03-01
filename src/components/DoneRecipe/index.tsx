import { DoneRecipeProps } from '../../@types/DoneRecipeType';
import { copyTextToClipBoard } from '../../utils/copyTextToClipBoard';

function DoneRecipe(props: DoneRecipeProps) {
  const { doneRecipe, index } = props;
  const url = `${window.location.origin}/${doneRecipe.type}s/${doneRecipe.id}`;
  const copyText = async (text: string) => {
    const imgElement = document.getElementById('share-done-recipe-button');
    imgElement?.append(await copyTextToClipBoard(text));
  };

  const handleClick = () => {
    window.location.href = url;
  };
  return (
    <div id={ `${index}-done-recipe-element` }>
      <button onClick={ handleClick }>
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
      <button id={ `${index}-share-done-recipe-button` } onClick={ () => copyText(url) }>
        <img
          data-testid={ `${index}-horizontal-share-btn` }
          id="share-done-recipe-button"
          src="src/images/shareIcon.svg"
          alt="Compartilhar"
        />
        <span>Compartilhar</span>
      </button>
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
