import { ReactNode, useState } from 'react';
import RecipesContext from '.';
import { RecipesContextType, SearchInfoType } from '../../@types/RecipesContextType';

type RecipesProviderprops = { children: ReactNode };

function RecipesProvider({ children }:RecipesProviderprops) {
  const initialState: SearchInfoType = { searchTerm: '', searchType: 'name' };
  const searchInfo = useState < RecipesContextType >(initialState);

  return (
    <RecipesContext.Provider
      value={ searchInfo }
    >
      {' '}
      {children}
      {' '}

    </RecipesContext.Provider>

  );
}

export default RecipesProvider;
