import { useEffect, useState } from 'react';
import { fetchAny } from '../services/fetchApi';
import { AnyRecipeType } from '../@types/AnyRecipeType';

const useFetchDrinkOrFoodByCategory = (category: string, type: string) => {
  const [recipes, setRecipes] = useState<AnyRecipeType[] | string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);

        const data = await fetchAny(category, type, 'category');

        if (category !== '' && data) setRecipes(data as AnyRecipeType[]);
        else setRecipes(data as string[]);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message ?? 'Error fetching recipes');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, [category, type]);
  return {
    recipes,
    loading,
    error,
  };
};

export default useFetchDrinkOrFoodByCategory;
