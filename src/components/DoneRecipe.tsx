import { DoneRecipeProps } from '../@types/DoneRecipeType';

function DoneRecipe(props: DoneRecipeProps) {
  const { doneRecipe, index } = props;

  const copyURL = async () => {
    const urlShare = `${window.location.origin}/${doneRecipe.type}s/${doneRecipe.id}`;
    try {
      await navigator.clipboard.writeText(urlShare);
      const copiedText = await navigator.clipboard.readText();
      alert(`Link copied! ${copiedText}`);
    } catch (err) {
      console.error('Erro ao copiar para a área de transferência:', err);
    }
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
      <button id={ `${index}-share-done-recipe-button` } onClick={ copyURL }>
        <img
          data-testid={ `${index}-horizontal-share-btn` }
          id="share-done-recipe-button"
          src="src/images/shareIcon.svg"
          alt="Compartilhar"
        />
        Compartilhar
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
