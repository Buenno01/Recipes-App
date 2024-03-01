import { useLocation, useParams } from 'react-router-dom';
// import { useEffect, useState } from 'react';
import useFetchDrinkOrFoodById from '../../services/useFetchDrinkOrFoodById';
import { RecipeOptionsType } from '../../@types/RecipeOptionsType';
import IngredientList from '../../components/IngredientList';
import useFetchDrinkOrFoodByName from '../../services/useFetchDrinkOrFoodByName';
import RecomendationsList from './components/RecomendationsList';
import { useDoneRecipesContext } from '../../contexts/DoneRecipesContext';

function RecipeDetails() {
  const { id } = useParams();
  const { doneRecipesContext } = useDoneRecipesContext();
  const location = useLocation();
  const recipeType: RecipeOptionsType = location.pathname.includes('meals')
    ? 'meals' : 'drinks';
  const recomendationType: RecipeOptionsType = recipeType === 'meals'
    ? 'drinks' : 'meals';
  // const [recomendationName, setRecomendationName] = useState<string | undefined>('');
  const {
    recipe,
    loading,
    error,
  } = useFetchDrinkOrFoodById(id || '', recipeType);
  const { recipes: recomendationData } = useFetchDrinkOrFoodByName('', recomendationType);
  const recomendation = recomendationData.slice(0, 6);

  // useEffect(() => { setRecomendationName(recipe?.name); }, [recipe?.name]);

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
      <RecomendationsList.Root>
        {
          recomendation.map((rec, index) => (
            <RecomendationsList.Item
              index={ index }
              key={ index + rec.name }
              title={ rec.name }
              imgSrc={ rec.thumb }
            />
          ))
        }
      </RecomendationsList.Root>
      {
        !doneRecipesContext.some((doneRecipe) => doneRecipe.id === id)
        && (
          <button
            className="fixed bottom-0"
            data-testid="start-recipe-btn"
          >
            Start Recipe
          </button>
        )
      }
    </>
  );
}

export default RecipeDetails;
