import { ReactNode, useState } from 'react';
import RecipesContext from '.';
import { FetchParamsType, RecipesContextType } from '../../@types/RecipesContextType';
import useFetch from '../../hooks/useFetch';

type RecipesProviderProps = {
  children: ReactNode;
};

function RecipesProvider({ children }: RecipesProviderProps) {
  const INITIAL_PARAMS: FetchParamsType = {
    param: '',
    recipeType: undefined,
    endpoint: 'name',
  };
  const [fetchParams, setFetchParams] = useState<FetchParamsType>(INITIAL_PARAMS);
  const { endpoint, param, recipeType } = fetchParams;

  type EndpointType = `${fetchParams}`;

  const {
    data: recipes,
    error,
    loading,
  } = useFetch<>(param, recipeType, endpoint);

  const value: RecipesContextType = {
    fetchParams,
    setFetchParams,
    recipes: recipes ?? [],
    error,
    loading,
  };
  return (
    <RecipesContext.Provider value={ value }>
      { children }
    </RecipesContext.Provider>
  );
}

export default RecipesProvider;
