import { useNavigate } from 'react-router-dom';
import { DoneRecipeType } from '../@types/DoneRecipeType';
import RecipeCard from './RecipeCard';
import ShareButton from './ShareButton';
import { formatDate } from '../utils/formatDate';

type DoneRecipeCardProps = {
  doneRecipe: DoneRecipeType
  index: number,
};
function DoneRecipeCard({ doneRecipe, index }: DoneRecipeCardProps) {
  const url = `/${doneRecipe.type}s/${doneRecipe.id}`;
  const nav = useNavigate();
  const handleClick = () => {
    nav(url);
  };

  return (
    <RecipeCard.Root>
      <RecipeCard.Image
        index={ index }
        name={ doneRecipe.name }
        onClick={ handleClick }
        source={ doneRecipe.image }
      />
      <RecipeCard.Content>
        <RecipeCard.Wrapper>
          <RecipeCard.Title
            index={ index }
            onClick={ handleClick }
            recipe={ doneRecipe }
          />
          <ShareButton
            alt="Compatilhar"
            copyText={ window.location.origin + url }
            dataTestID={ `${index}-horizontal-share-btn` }
          />
        </RecipeCard.Wrapper>
        <RecipeCard.Wrapper>
          <p data-testid={ `${index}-horizontal-done-date` }>
            { `Done in: ${formatDate(doneRecipe.doneDate)}`}
          </p>
        </RecipeCard.Wrapper>
        <RecipeCard.Wrapper>
          <RecipeCard.Tags tags={ doneRecipe.tags } index={ index } />
        </RecipeCard.Wrapper>
      </RecipeCard.Content>
    </RecipeCard.Root>
  );
}

export default DoneRecipeCard;
