import { DoneRecipeProps } from '../@types/DoneRecipeType';

function DoneRecipe(props: DoneRecipeProps) {
  const { doneRecipe, index } = props;
  const text = `${window.location.origin}/${doneRecipe.type}s/${doneRecipe.id}`;

  const copyText = async (link: string) => {
    await navigator.clipboard.writeText(link);
    const textElement = document.getElementById('link-copied') as HTMLSpanElement;
    textElement.textContent = 'Link copied!';
  };

  return (
    <div id={ `${index}-done-recipe-element` }>
      <img
        src={ doneRecipe.image }
        data-testid={ `${index}-horizontal-image` }
        alt={ doneRecipe.name }
      />
      <p data-testid={ `${index}-horizontal-top-text` }>
        {doneRecipe.type === 'meal'
          ? `${doneRecipe.nationality} - ${doneRecipe.category}`
          : `${doneRecipe.alcoholicOrNot}`}
      </p>
      <p data-testid={ `${index}-horizontal-name` }>{doneRecipe.name}</p>
      <p data-testid={ `${index}-horizontal-done-date` }>{doneRecipe.doneDate}</p>
      <button id={ `${index}-share-done-recipe-button` } onClick={ () => copyText(text) }>
        <img
          data-testid={ `${index}-horizontal-share-btn` }
          id="share-done-recipe-button"
          src="src/images/shareIcon.svg"
          alt="Compartilhar"
        />
        <span>Compartilhar</span>
        <span id="link-copied" />
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
