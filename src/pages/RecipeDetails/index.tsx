import { useLocation, useParams } from 'react-router-dom';
import useFetchDrinkOrFoodById from '../../services/useFetchDrinkOrFoodById';
import { RecipeOptionsType } from '../../@types/RecipeOptionsType';
import IngredientList from '../../components/IngredientList';
import useFetchDrinkOrFoodByName from '../../services/useFetchDrinkOrFoodByName';
import Recomendations from './components/Recomendations';
import ButtonStartOrContinue from './components/ButtonStartOrContinue';
import Ingredients from './components/Ingredients';
import Video from './components/Video';
import DetailsHeader from './components/DetailsHeader';

function RecipeDetails() {
  const { id } = useParams();
  const location = useLocation();
  const recipeType: RecipeOptionsType = location.pathname.includes('meals')
    ? 'meals' : 'drinks';
  const recomendationType: RecipeOptionsType = recipeType === 'meals'
    ? 'drinks' : 'meals';
  const {
    recipe,
    loading,
    error,
  } = useFetchDrinkOrFoodById(id || '', recipeType);
  const { recipes: recomendationData } = useFetchDrinkOrFoodByName('', recomendationType);
  const recomendations = recomendationData.slice(0, 6);

  if (loading) return <p>Loading...</p>;
  if (error || !recipe) return <p>Erro ao carregar</p>;
  return (
    <>
      <DetailsHeader recipe={ recipe } />
      <Ingredients recipe={ recipe } />
      <p data-testid="instructions">
        {recipe.instructions}
      </p>
      <Video recipe={ recipe } />
      <Recomendations recomendations={ recomendations } />
      <ButtonStartOrContinue id={ id || '' } recipeType={ recipeType } />
    </>
  );
}

export default RecipeDetails;
