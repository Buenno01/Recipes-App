import { useParams } from 'react-router-dom';
import useFetchDrinkOrFoodById from '../../services/useFetchDrinkOrFoodById';
import { RecipeOptionsType } from '../../@types/RecipeOptionsType';

function Details() {
  const { id, recipeType } = useParams();
  const {
    recipe,
    loading,
    error,
  } = useFetchDrinkOrFoodById(id || '', recipeType as RecipeOptionsType);

  // A foto deve ter o atributo data-testid="recipe-photo".
  // O título deve ter o atributo data-testid="recipe-title".
  // O texto da categoria deve ter o atributo data-testid="recipe-category".
  // Os ingredientes devem ter o atributo data-testid="${index}-ingredient-name-and-measure".
  // O texto de instruções deve ter o atributo data-testid="instructions".
  // O vídeo, presente somente na tela de comidas, deve ter o atributo data-testid="video".
  if (loading) return <p>Loading...</p>;
  if (error || !recipe) return <p>Erro ao carregar</p>;
  return (
    <>
      <img data-testid="recipe-photo" src={ recipe.thumb } alt={ recipe.name } />
      <h2 data-testid="recipe-title">{recipe.name}</h2>
      <p data-testid="recipe-category">
        {
          recipeType === 'meals' ? recipe.category : recipe?.alcoholic
        }
      </p>
      <ul>
        {
          recipe.ingredients.map((ingredient, index) => {
            const measure = recipe.measures[index];
            return (
              <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
                {`${measure ? `${measure} - ` : ''}${ingredient}`}
              </li>
            );
          })
        }
      </ul>
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

export default Details;
