import { useLocation } from 'react-router-dom';
import { RecipeOptionsType } from '../../@types/RecipeOptionsType';
import useFetchDrinkOrFoodByName from '../../services/useFetchDrinkOrFoodByName';

function Home() {
  const location = useLocation();
  const recipeType: RecipeOptionsType = location.pathname.includes('meal')
    ? 'meals' : 'drinks';
  const {
    error,
    loading,
    recipes,
  } = useFetchDrinkOrFoodByName('', recipeType);

  if (loading) return <p>Loading...</p>;
  if (error || !recipes) return <p>{error}</p>;
  return (
    // Esse teste id é apenas para passar no teste de rotas do Login.test
    <>
      <div data-testid="divHome" />
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
    </>
  );
}

export default Home;
