import { useNavigate } from 'react-router-dom';
import { DoneRecipeProps } from '../../@types/DoneRecipeType';
import ShareButton from '../ShareButton';
import ClickableImage from '../ClickableImage';
import CategoryDrinkOrMeal from '../CategoryDrinkOrMeal';
import { formatDate } from '../../utils/formatDate';

function DoneRecipe(props: DoneRecipeProps) {
  const nav = useNavigate();
  const { doneRecipe, index } = props;
  const url = `/${doneRecipe.type}s/${doneRecipe.id}`;
  const handleClick = () => {
    nav(url);
  };
  return (
    <div className="flex h-64 mb-1">
      <div className="w-1/2 h-full">
        <ClickableImage
          recipe={ doneRecipe }
          onClick={ handleClick }
          index={ index }
        />
      </div>
      <div className="w-1/2 h-full text-center mt-4">
        <button onClick={ handleClick }>
          <p data-testid={ `${index}-horizontal-name` } className="font-bold">
            {doneRecipe.name}
          </p>
        </button>
        <CategoryDrinkOrMeal
          recipe={ doneRecipe }
          index={ index }
          className="text-sm text-gray-500"
        />
        <div className="mt-10">
          <span>Done in: </span>
          <span
            data-testid={ `${index}-horizontal-done-date` }
          >
            {formatDate(doneRecipe.doneDate)}
          </span>
        </div>
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
      <div className="w-auto h-full bg-blue-500">
        <ShareButton
          alt="Compatilhar"
          dataTestID={ `${index}-horizontal-share-btn` }
          copyText={ window.location.origin + url }
        />
      </div>
    </div>
  );
}

export default DoneRecipe;
