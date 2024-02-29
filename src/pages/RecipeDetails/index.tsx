import { useLocation, useParams } from 'react-router-dom';
import useFetchDrinkOrFoodById from '../../services/useFetchDrinkOrFoodById';
import { RecipeOptionsType } from '../../@types/RecipeOptionsType';
import IngredientList from '../../components/IngredientList';

function RecipeDetails() {
  const { id } = useParams();
  const location = useLocation();
  const recipeType = location.pathname.includes('meals') ? 'meals' : 'drinks';
  const {
    recipe,
    loading,
    error,
  } = useFetchDrinkOrFoodById(id || '', recipeType as RecipeOptionsType);

  if (loading) return <p>Loading...</p>;
  if (error || !recipe) return <p>Erro ao carregar</p>;
  return (
    <>
      <img data-testid="recipe-photo" src={ recipe.thumb } alt={ recipe.name } />
      <h2 data-testid="recipe-title">{recipe.name}</h2>
      <p data-testid="recipe-category">
        {recipe.type === 'meals' && recipe.category}
        {recipe.type === 'drinks' && recipe.alcoholic}
      </p>
      <IngredientList.Root>
        {
          recipe.ingredients.map((ingredient, index) => {
            const measure = recipe.measures[index];
            return (
              <IngredientList.Item
                key={ index }
                ingredient={ ingredient }
                measure={ measure }
                index={ index }
              />
            );
          })
        }
      </IngredientList.Root>
      <p data-testid="instructions">
        {recipe.instructions}
      </p>
      {
        recipeType === 'meals' && (
          recipe.video && (
            <div>
              <iframe
                data-testid="video"
                title={ recipe.name }
                src={ recipe.video }
              />
            </div>
          )
        )
      }
    </>
  );
}

export default RecipeDetails;
