import { ReactNode } from 'react';
import InProgressContext from '.';
import { InProgressContextType } from '../../@types/InProgressContextType';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { InProgressStorageType } from '../../@types/InProgressStorageType';
import { RecipeOptionsType } from '../../@types/RecipeOptionsType';
import { DoneRecipeType } from '../../@types/DoneRecipeType';

type InProgressProviderProps = {
  children: ReactNode;
};

function InProgressProvider({ children }: InProgressProviderProps) {
  const initialStorage: InProgressStorageType = { meals: {}, drinks: {} };
  const [progress, setProgress] = useLocalStorage<InProgressStorageType>(
    'inProgressRecipes',
    initialStorage,
  );
  const [doneRecipes,
    setDoneRecipes] = useLocalStorage<DoneRecipeType[]>('doneRecipes', []);

  const addIngredient = (
    recipeType: RecipeOptionsType,
    recipeId: string,
    ingredient: string,
  ) => {
    const newProgress = {
      ...progress,
      [recipeType]: {
        ...progress[recipeType],
        [recipeId]: [...(progress[recipeType][recipeId] || []), ingredient],
      },
    };
    setProgress(newProgress);
  };
  const finishRecipe = (doneRecipe: DoneRecipeType) => {
    setDoneRecipes([...doneRecipes, doneRecipe]);
  };
  const removeIngredient = (
    recipeType: RecipeOptionsType,
    recipeId: string,
    ingredient: string,
  ) => {
    const newProgress = {
      ...progress,
      [recipeType]: {
        ...progress[recipeType],
        [recipeId]: (progress[recipeType][recipeId] || []).filter(
          (ing) => ing !== ingredient,
        ),
      },
    };
    setProgress(newProgress);
  };
  const startNewRecipe = (recipeType: RecipeOptionsType, recipeId: string) => {
    const newProgress = {
      ...progress,
      [recipeType]: {
        ...progress[recipeType],
        [recipeId]: [],
      },
    };
    setProgress(newProgress);
  };
  const value: InProgressContextType = {
    progress,
    addIngredient,
    finishRecipe,
    removeIngredient,
    startNewRecipe,
    doneRecipes,
  };
  return (
    <InProgressContext.Provider value={ value }>
      {children}
    </InProgressContext.Provider>
  );
}

export default InProgressProvider;
