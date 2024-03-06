import { useEffect, useState } from 'react';
import { RecipeOptionsType } from '../@types/RecipeOptionsType';
import { fetchAny } from '../services/fetchApi';

type UseFetchCategoriesReturnType = {
  categories: string[];
  loading: boolean;
  error: string;
};

const useFetchCategories = (recipeType: RecipeOptionsType):
UseFetchCategoriesReturnType => {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await fetchAny('', recipeType, 'categories') as string[];
        setCategories(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message ?? 'Error fetching categories');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [recipeType]);

  return {
    categories,
    loading,
    error,
  };
};

export default useFetchCategories;
