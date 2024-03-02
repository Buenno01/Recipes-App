import { FavoriteRecipeType } from '../../@types/FavoriteRecipeType';
import FavoriteRecipesContext from '.';
import { FavoriteRecipesContextType } from '../../@types/FavoriteRecipesContextType';
import { useLocalStorage } from '../../hooks/useLocalStorage';

type FavoriteRecipesProviderProps = {
  children: React.ReactNode;
};

function FavoriteRecipesProvider({ children } : FavoriteRecipesProviderProps) {
  const [
    favoriteRecipes,
    setFavoriteRecipes,
  ] = useLocalStorage<FavoriteRecipeType[]>('favoriteRecipes', []);

  const value: FavoriteRecipesContextType = {
    favoriteRecipes,
    setFavoriteRecipes,
  };

  return (
    <FavoriteRecipesContext.Provider value={ value }>
      {children}
    </FavoriteRecipesContext.Provider>
  );
}

export default FavoriteRecipesProvider;
