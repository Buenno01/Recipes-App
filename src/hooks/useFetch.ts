import { useEffect, useState } from 'react';
import { AnyRecipeType } from '../@types/AnyRecipeType';
import { BasicRecipeInfoType } from '../@types/BasicRecipeInfoType';
import { RecipeOptionsType } from '../@types/RecipeOptionsType';
import { EndpointOptionsKeys, fetchAny } from '../services/fetchApi';

type FetchAnyReturnType<T> =
  T extends 'name' | 'category' | 'firstLetter' | 'id'
    ? AnyRecipeType[]
    : T extends 'categories'
      ? string[]
      : BasicRecipeInfoType[];

type DataType<T> = FetchAnyReturnType<T> | undefined;

type UseFetchReturnType<T> = {
  data: DataType<T>;
  loading: boolean;
  error: string;
};

function useFetch<T extends EndpointOptionsKeys>(
  param: string,
  recipeType: RecipeOptionsType | undefined,
  endpoint: EndpointOptionsKeys,
): UseFetchReturnType<T> {
  const [data, setData] = useState<DataType<T>>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecipe = async (type: RecipeOptionsType) => {
      try {
        setLoading(true);
        const response = await fetchAny(param, type, endpoint);
        setData(response as FetchAnyReturnType<T>);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message ?? 'Error fetching data');
        } else {
          setError('Error fetching data');
        }
      } finally {
        setLoading(false);
      }
    };

    if (recipeType !== undefined) {
      fetchRecipe(recipeType);
    }
  }, [param, recipeType, endpoint]);

  return { data, loading, error };
}

export default useFetch;
