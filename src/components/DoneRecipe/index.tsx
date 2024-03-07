import { useNavigate } from 'react-router-dom';
import { DoneRecipeProps } from '../../@types/DoneRecipeType';
import ShareButton from '../ShareButton';
import ClickableImage from '../ClickableImage';
import { formatDate } from '../../utils/formatDate';
import CategoryAndName from '../CategoryAndName';

function DoneRecipe(props: DoneRecipeProps) {
  const nav = useNavigate();
  const { doneRecipe, index } = props;
  const url = `/${doneRecipe.type}s/${doneRecipe.id}`;
  const handleClick = () => {
    nav(url);
  };
  return (
    <div className="flex h-48 mb-4 border border-gray-400 h-full">
      <div className="w-1/2 flex-shrink-0">
        <ClickableImage
          recipe={ doneRecipe }
          onClick={ handleClick }
          index={ index }
        />
      </div>
      <div className="flex-col text-left">
        <div className="flex-col mt-2">
          <CategoryAndName
            onClick={ handleClick }
            recipe={ doneRecipe }
            index={ index }
          />
        </div>
        <div className="mt-4">
          <span>Done in: </span>
          <span
            data-testid={ `${index}-horizontal-done-date` }
          >
            {formatDate(doneRecipe.doneDate)}
          </span>
        </div>
        <div className="flex justify-evenly mt-8">
          {
      doneRecipe.tags?.map((tagName: string, tagIndex: number) => {
        if (tagIndex >= 2) return;
        return (
          <span
            key={ tagName }
            data-testid={ `${index}-${tagName}-horizontal-tag` }
            className="px-2 bg-gray-200 rounded-full"
          >
            {tagName}
          </span>
        );
      })
}
        </div>
      </div>
      <div className="w-1/6 mt-4">
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
