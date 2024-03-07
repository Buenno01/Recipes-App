import { createContext, useContext } from 'react';
import { RecipesContextType } from '../../@types/RecipesContextType';

const INITIAL_STATE: RecipesContextType = {
  fetchParams: {
    param: '',
    recipeType: undefined,
    endpoint: 'name',
  },
  setFetchParams: () => {},
  recipes: [],
  error: '',
  loading: false,
};

const RecipesContext = createContext<RecipesContextType>(INITIAL_STATE);

export default RecipesContext;

export const useRecipesContext = () => useContext(RecipesContext);
