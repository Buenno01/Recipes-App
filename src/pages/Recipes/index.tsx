import { useLocation } from 'react-router-dom';
import { RecipeOptionsType } from '../../@types/RecipeOptionsType';
import useFetchDrinkOrFoodByName from '../../hooks/useFetchDrinkOrFoodByName';
import useFetchCategories from '../../hooks/useFetchCategories';

function Home() {
  const location = useLocation();
  const recipeType: RecipeOptionsType = location.pathname.includes('meal')
    ? 'meals' : 'drinks';
  const {
    error,
    loading,
    recipes,
  } = useFetchDrinkOrFoodByName('', recipeType);

  const {
    error: errorCategories,
    loading: loadingCategories,
    categories,
  } = useFetchCategories(recipeType);

  if (loading) return <p>Loading...</p>;
  if (error || !recipes) return <p>{error}</p>;
  return (
  // Esse teste id é apenas para passar no teste de rotas do Login.test
    <div data-testid="divHome">
      <ul>
        {
          (!errorCategories && !loadingCategories)
          && categories.slice(0, 5).map((category) => (
            <li data-testid={ `${category}-category-filter` } key={ category }>
              <button>
                {category}
              </button>
            </li>
          ))
}
      </ul>
      {
        recipes.slice(0, 12).map((recipe, index) => (
          <div data-testid={ `${index}-recipe-card` } key={ recipe.name }>
            <img
              data-testid={ `${index}-card-img` }
              src={ recipe.thumb }
              alt={ recipe.name }
            />
            <p data-testid={ `${index}-card-name` }>{recipe.name}</p>
          </div>
        ))
      }
    </div>
  );
}

export default Home;
