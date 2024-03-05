import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { RecipeOptionsType } from '../../@types/RecipeOptionsType';
import useFetchCategories from '../../hooks/useFetchCategories';
import useFetchRecipesWithFilter from '../../hooks/useFetchRecipesWithFilter';

function Home() {
  const location = useLocation();
  const recipeType: RecipeOptionsType = location.pathname.includes('meal')
    ? 'meals' : 'drinks';

  const {
    loading,
    error,
    recipes,
    setCategory,
    setType,
  } = useFetchRecipesWithFilter(recipeType);

  const {
    error: errorCategories,
    loading: loadingCategories,
    categories,
  } = useFetchCategories(recipeType);

  console.log(categories);

  useEffect(() => { setType(recipeType); }, [recipeType, setType]);

  if (loading) return <p>Loading...</p>;
  if (error || !recipes) return <p>Error fetching recipes</p>;
  return (
  // Esse teste id é apenas para passar no teste de rotas do Login.test
    <div data-testid="divHome">
      <ul>
        {
          (!errorCategories && !loadingCategories)
          && categories.slice(0, 5).map((item) => (
            <li data-testid={ `${item}-category-filter` } key={ item }>
              <button onClick={ () => { setCategory(item); } }>
                {item}
              </button>
            </li>
          ))
        }
        <li>
          <button
            data-testid="All-category-filter"
            onClick={ () => { setCategory(''); } }
          >
            All
          </button>
        </li>
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
