import { ReactNode } from 'react';
import InProgressContext from '.';
import { InProgressContextType } from '../../@types/InProgressContextType';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { InProgressStorageType } from '../../@types/InProgressStorageType';
import { RecipeOptionsType } from '../../@types/RecipeOptionsType';

type InProgressProviderProps = {
  children: ReactNode;
};

function InProgressProvider({ children }: InProgressProviderProps) {
  const initialStorage: InProgressStorageType = { meals: {}, drinks: {} };
  const [progress, setProgress] = useLocalStorage<InProgressStorageType>(
    'inProgressRecipes',
    initialStorage,
  );

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
  const finishRecipe = (recipeType: RecipeOptionsType, recipeId: string) => {
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
    progress: { meals: {}, drinks: {} },
    addIngredient,
    finishRecipe,
    removeIngredient,
    startNewRecipe,
  };
  return (
    <InProgressContext.Provider value={ value }>
      {children}
    </InProgressContext.Provider>
  );
}

export default InProgressProvider;
