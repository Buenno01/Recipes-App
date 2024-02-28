import { useEffect, useState } from 'react';
import { MealRecipeType } from '../@types/MealRecipeType';

type ReturnUseFetchFoodByIdType = {
  meal: MealRecipeType | undefined;
  loading: boolean;
  error: string;
};

const useFetchFoodById = (id: string): ReturnUseFetchFoodByIdType => {
  const [meal, setMeal] = useState<MealRecipeType>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFoodById = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await response.json();
        setMeal(data.meals[0]);
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

    fetchFoodById();
  }, [id]);

  return { meal, loading, error };
};

export default useFetchFoodById;
