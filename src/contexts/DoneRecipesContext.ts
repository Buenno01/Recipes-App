import { createContext, useContext } from 'react';
import { DoneRecipesContextType } from '../@types/DoneRecipesContextType';

const INITIAL_VALUE = {
  doneRecipesContext: [],
  setDoneRecipesContext: () => {},
};
export const DoneRecipesContext = createContext<DoneRecipesContextType>(INITIAL_VALUE);

export const useDoneRecipesContext = () => useContext(DoneRecipesContext);
