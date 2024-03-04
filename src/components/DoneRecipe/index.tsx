import { useNavigate } from 'react-router-dom';
import { DoneRecipeProps } from '../../@types/DoneRecipeType';
import ShareButton from '../ShareButton';
import ClickableImageAndName from '../ClickableImageAndName';
import CategoryDrinkOrMeal from '../CategoryDrinkOrMeal';

function DoneRecipe(props: DoneRecipeProps) {
  const nav = useNavigate();
  const { doneRecipe, index } = props;
  const url = `/${doneRecipe.type}s/${doneRecipe.id}`;
  const handleClick = () => {
    nav(url);
  };
  return (
    <div>
      <ClickableImageAndName
        recipe={ doneRecipe }
        onClick={ handleClick }
        index={ index }
      />
      <CategoryDrinkOrMeal recipe={ doneRecipe } index={ index } />
      <p data-testid={ `${index}-horizontal-done-date` }>{doneRecipe.doneDate}</p>
      <ShareButton
        alt="Compatilhar"
        dataTestID={ `${index}-horizontal-share-btn` }
        copyText={ window.location.origin + url }
      />

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
