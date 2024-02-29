import { DoneRecipeProps } from '../@types/DoneRecipeType';

function DoneRecipe(props: DoneRecipeProps) {
  const { doneRecipe, index } = props;
  const urlShare = `${window.location.origin}/${doneRecipe.type}/${doneRecipe.id}`;
  const copyURL = async () => {
    const copyElement = document.createElement('input');
    copyElement.value = urlShare;
    copyElement.select();
    try {
      await navigator.clipboard.writeText(urlShare);
    } catch (err) {
      console.error('Erro ao copiar para a área de transferência:', err);
    }
    alert('Link copied!');
  };
  return (
    <div>
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
      <button onClick={ copyURL }>
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
