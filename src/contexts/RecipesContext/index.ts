import { createContext, useContext } from 'react';
import { RecipesContextType } from '../../@types/RecipesContextType';

const INITIAL_STATE: RecipesContextType = {

};

const RecipesContext = createContext<RecipesContextType>(INITIAL_STATE);

export const useRecipesContext = () => useContext(RecipesContext);

export default RecipesContext;
