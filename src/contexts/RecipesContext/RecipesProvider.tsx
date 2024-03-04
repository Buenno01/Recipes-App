import { ReactNode } from 'react';
import RecipesContext from '.';
import { RecipesContextType } from '../../@types/RecipesContextType';

type RecipesProviderProps = {
  children: ReactNode;
};

function RecipesProvider({ children }: RecipesProviderProps) {
  const value: RecipesContextType = {

  };
  return (
    <RecipesContext.Provider value={ value }>
      {children}
    </RecipesContext.Provider>
  );
}

export default RecipesProvider;
