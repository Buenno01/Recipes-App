import { useEffect, useState } from 'react';
import { RecipeOptionsType } from '../@types/RecipeOptionsType';

type UseFetchCategoriesReturnType = {
  categories: string[];
  loading: boolean;
  error: string;
};

const BASE_END_URL = '/api/json/v1/1/list.php?c=list';
const BASE_MEAL_URL = `https://www.themealdb.com${BASE_END_URL}`;
const BASE_DRINK_URL = `https://www.thecocktaildb.com${BASE_END_URL}`;
type APICategoryType = { strCategory: string };

const formatCategories = (data: APICategoryType[]): string[] => data
  .map(({ strCategory }) => strCategory);

const useFetchCategories = (recipeType: RecipeOptionsType):
UseFetchCategoriesReturnType => {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchUrl = recipeType === 'meals' ? BASE_MEAL_URL : BASE_DRINK_URL;
        const response = await fetch(fetchUrl);
        const data = await response.json();
        const formattedCategories = formatCategories(data[recipeType]);
        setCategories(formattedCategories);
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
