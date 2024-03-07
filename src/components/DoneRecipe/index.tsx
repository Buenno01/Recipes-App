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
    <div className="flex h-64 mb-4 border border-gray-400">
      <div className="w-1/2 h-full flex-shrink-0">
        <ClickableImage
          recipe={ doneRecipe }
          onClick={ handleClick }
          index={ index }
        />
      </div>
      <div className="w-1/2 h-full pt-4 text-left pl-4">
        <CategoryAndName onClick={ handleClick } recipe={ doneRecipe } index={ index } />
        <div className="mt-10">
          <span>Done in: </span>
          <span
            data-testid={ `${index}-horizontal-done-date` }
          >
            {formatDate(doneRecipe.doneDate)}
          </span>
        </div>
        <div className="flex">
          {
      doneRecipe.tags?.map((tagName: string, tagIndex: number) => {
        if (tagIndex >= 2) return;
        return (
          <p
            key={ tagName }
            data-testid={ `${index}-${tagName}-horizontal-tag` }
            className="px-2 ml-2 mt-16 bg-gray-200 rounded-full"
          >
            {tagName}
          </p>
        );
      })
}
        </div>
      </div>
      <div className="w-1/6 h-full mt-4">
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
