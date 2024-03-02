import { createContext, useContext } from 'react';
import { FavoriteRecipesContextType } from '../../@types/FavoriteRecipesContextType';

const INITIAL_VALUE: FavoriteRecipesContextType = {
  favoriteRecipes: [],
  setFavoriteRecipes: () => {},
};

const FavoriteRecipesContext = createContext<FavoriteRecipesContextType>(INITIAL_VALUE);

export const useFavoriteRecipesContext = () => useContext(FavoriteRecipesContext);

export default FavoriteRecipesContext;
