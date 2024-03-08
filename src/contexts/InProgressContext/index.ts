import { createContext, useContext } from 'react';
import { InProgressContextType } from '../../@types/InProgressContextType';

const INITIAL_STATE: InProgressContextType = {
  progress: { meals: {}, drinks: {} },
  addIngredient: () => {},
  finishRecipe: () => {},
  removeIngredient: () => {},
  startNewRecipe: () => {},
};

const InProgressContext = createContext<InProgressContextType>(INITIAL_STATE);

export default InProgressContext;

export const useInProgressContext = () => useContext(InProgressContext);
