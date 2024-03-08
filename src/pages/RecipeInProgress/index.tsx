import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Video from '../../components/Video';
import Title from '../../components/Title';
import { RecipeOptionsType } from '../../@types/RecipeOptionsType';
import useFetch from '../../hooks/useFetch';
import IngredientsCheckBox from '../../components/IngredientsCheckBox';
import Instructions from '../../components/Instructions';
import BottomFixedBtn from '../../components/BottomFixedBtn';
import { useInProgressContext } from '../../contexts/InProgressContext';

function RecipeInProgress() {
  const { id } = useParams();
  const location = useLocation();
  const recipeType : RecipeOptionsType = location.pathname
    .includes('meals') ? 'meals' : 'drinks';
  const [disabled, setDisabled] = useState(true);

  const { data } = useFetch<'id'>(id || '', recipeType, 'id');

  const {
    startNewRecipe,
    finishRecipe,
    progress,
  } = useInProgressContext();

  const handleDisabled = (recipeProgress: string[], totalIngredients: string[]) => {
    if (recipeProgress.length === totalIngredients.length) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  useEffect(() => {
    if (id && data && data.length > 0) {
      handleDisabled(progress[recipeType][id], data[0].ingredients);
    }
  }, [data, id, progress, recipeType]);

  useEffect(() => {
    if (id && progress[recipeType][id] === undefined) {
      startNewRecipe(recipeType, id);
    }
  }, [id, recipeType, startNewRecipe]);

  if (!data) return;
  return (
    <>
      <Title recipe={ data[0] } />
      <IngredientsCheckBox
        recipe={ data[0] }
      />
      <Instructions instructions={ data[0].instructions } />
      <Video recipe={ data[0] } />
      <BottomFixedBtn
        data-testid="finish-recipe-btn"
        disabled={ disabled }
        onClick={ () => finishRecipe(recipeType, id || '') }
      >
        Finish Recipe
      </BottomFixedBtn>
    </>
  );
}

export default RecipeInProgress;
