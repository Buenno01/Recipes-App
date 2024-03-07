import { Link, useLocation } from 'react-router-dom';
import { BasicRecipeInfoType } from '../../@types/BasicRecipeInfoType';

type RecipesListItemProps = {
  recipe: BasicRecipeInfoType;
  index: number;
};

function RecipesListItem({ index, recipe }: RecipesListItemProps) {
  const { pathname } = useLocation();
  const recipeType = pathname.includes('meals') ? 'meals' : 'drinks';
  return (
    <Link key={ recipe.name } to={ `/${recipeType}/${recipe.id}` }>
      <div data-testid={ `${index}-recipe-card` }>
        <img
          data-testid={ `${index}-card-img` }
          src={ recipe.thumb }
          alt={ recipe.name }
        />
        <p data-testid={ `${index}-card-name` }>{recipe.name}</p>
      </div>
    </Link>
  );
}

export default RecipesListItem;
