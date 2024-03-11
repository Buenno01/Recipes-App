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
    <Link
      className="flex flex-col w-40 h-40 rounded-lg overflow-hidden border"
      key={ recipe.name }
      to={ `/${recipeType}/${recipe.id}` }
    >
      <div
        className="relative"
        data-testid={ `${index}-recipe-card` }
      >
        <img
          data-testid={ `${index}-card-img` }
          src={ recipe.thumb }
          alt={ recipe.name }
        />
        <p
          className="absolute bottom-0 h-8 flex items-center
          bg-white text-primary-black px-4 w-full text-xs"
          data-testid={ `${index}-card-name` }
        >
          {recipe.name}
        </p>
      </div>
    </Link>
  );
}

export default RecipesListItem;
