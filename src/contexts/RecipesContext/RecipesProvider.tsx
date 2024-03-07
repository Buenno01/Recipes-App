import { ReactNode, useEffect, useState } from 'react';
import RecipesContext from '.';
import { FetchParamsType, RecipesContextType } from '../../@types/RecipesContextType';
import { BasicRecipeInfoType } from '../../@types/BasicRecipeInfoType';
import { EndpointOptionsKeys, fetchAny } from '../../services/fetchApi';
import { RecipeOptionsType } from '../../@types/RecipeOptionsType';

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
  const [recipes, setRecipes] = useState<BasicRecipeInfoType[] | undefined>(undefined);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const { endpoint, param, recipeType } = fetchParams;

  useEffect(() => {
    async function fetchData(type: RecipeOptionsType) {
      try {
        setLoading(true);
        setError('');
        const response = await fetchAny(param, type, endpoint as EndpointOptionsKeys);
        if (typeof response[0] === 'string') {
          setRecipes([]);
        } else {
          setRecipes(response as BasicRecipeInfoType[]);
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message ?? 'An error occurred');
        } else {
          setError('An error occurred');
        }
      } finally {
        setLoading(false);
      }
    }

    if (recipeType) {
      fetchData(recipeType);
    }
  }, [endpoint, param, recipeType]);

  const value: RecipesContextType = {
    fetchParams,
    setFetchParams,
    recipes,
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
