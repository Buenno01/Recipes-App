import { useLocation, useParams } from 'react-router-dom';
import useFetchDrinkOrFoodById from '../../hooks/useFetchDrinkOrFoodById';
import { RecipeOptionsType } from '../../@types/RecipeOptionsType';
import useFetchDrinkOrFoodByName from '../../hooks/useFetchDrinkOrFoodByName';
import Recomendations from '../../components/Recomendations';
import ButtonStartOrContinue from '../../components/ButtonStartOrContinue';
import Ingredients from '../../components/Ingredients';
import Video from '../../components/Video';
import Title from '../../components/Title';
import Instructions from '../../components/Instructions';

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
      <Title recipe={ recipe } />
      <Ingredients recipe={ recipe } />
      <Instructions instructions={ recipe.instructions } />
      <Video recipe={ recipe } />
      <Recomendations recomendations={ recomendations } />
      <ButtonStartOrContinue
        id={ id }
        recipeType={ recipeType }
      />
    </>
  );
}

export default RecipeDetails;
