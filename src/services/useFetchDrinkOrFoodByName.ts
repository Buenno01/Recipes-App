import { useEffect, useState } from 'react';
import { AnyRecipeType } from '../@types/AnyRecipeType';
import { RecipeOptionsType } from '../@types/RecipeOptionsType';
import { formatRecipeListToType } from './utils';

const MEAL_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const DRINK_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

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
      const fetchUrl = type === 'drinks' ? DRINK_URL : MEAL_URL;
      try {
        setLoading(true);
        const response = await fetch(fetchUrl + name);

        const data = await response.json();

        const baseRecipe = formatRecipeListToType(data[type], type);

        setRecipes(baseRecipe);
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
