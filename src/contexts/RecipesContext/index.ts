import { createContext, useContext } from 'react';

const RecipesContext = createContext({});
export const useRecipesContext = () => useContext(RecipesContext);

export default RecipesContext;
