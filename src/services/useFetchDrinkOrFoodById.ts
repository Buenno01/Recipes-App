import { useEffect, useState } from 'react';
import { RecipeOptionsType } from '../@types/RecipeOptionsType';
import { formatRecipeType } from './utils';
import { AnyRecipeType } from '../@types/AnyRecipeType';

const MEAL_URL = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
const DRINK_URL = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

type ReturnUseFetchDrinkOrFoodByIdType = {
  recipe: AnyRecipeType | undefined;
  loading: boolean;
  error: string;
};

const useFetchDrinkOrFoodById = (id: string, type: RecipeOptionsType)
: ReturnUseFetchDrinkOrFoodByIdType => {
  const [recipe, setRecipe] = useState<AnyRecipeType>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecipeById = async () => {
      try {
        setLoading(true);
        const fetchUrl = type === 'drinks' ? DRINK_URL : MEAL_URL;
        const response = await fetch(`${fetchUrl}${id}`);
        const data = await response.json();

        const baseRecipe = formatRecipeType(data[type][0]);
        setRecipe(baseRecipe);
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

    fetchRecipeById();
  }, [id, type]);

  return { recipe, loading, error };
};

export default useFetchDrinkOrFoodById;
