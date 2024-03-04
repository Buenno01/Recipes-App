import { useEffect, useState } from 'react';
import { AnyRecipeType } from '../@types/AnyRecipeType';
import { RecipeOptionsType } from '../@types/RecipeOptionsType';
import { fetchAny } from '../services/fetchApi';

type UseFetchDrinkOrFoodByNameReturnType = {
  recipes: AnyRecipeType[];
  loading: boolean;
  error: string;
};

const useFetchDrinkOrFoodByName = (
  name: string,
  type: RecipeOptionsType,
): UseFetchDrinkOrFoodByNameReturnType => {
  const [recipes, setRecipes] = useState<AnyRecipeType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecipesByName = async () => {
      try {
        setLoading(true);

        const data = await fetchAny(name, type, 'name');

        setRecipes(data as AnyRecipeType[]);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message ?? 'Error fetching data');
          setRecipes([]);
        } else {
          setError('Error fetching data');
          setRecipes([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRecipesByName();
  }, [type, name]);

  return { recipes, loading, error };
};

export default useFetchDrinkOrFoodByName;
