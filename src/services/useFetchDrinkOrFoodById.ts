import { useEffect, useState } from 'react';
import { DrinkRecipeType } from '../@types/DrinkRecipeType';
import { MealRecipeType } from '../@types/MealRecipeType';
import { RecipeOptionsType } from '../@types/RecipeOptionsType';
import { formatRecipeType } from './utils';

const MEAL_URL = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
const DRINK_URL = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

type ReturnUseFetchDrinkOrFoodByIdType = {
  recipe: DrinkRecipeType | MealRecipeType | undefined;
  loading: boolean;
  error: string;
};

const useFetchDrinkOrFoodById = (id: string, type: RecipeOptionsType)
: ReturnUseFetchDrinkOrFoodByIdType => {
  const [recipe, setRecipe] = useState<DrinkRecipeType | MealRecipeType>();
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

        if (type === 'drinks') {
          const drinkData = {
            ...baseRecipe,
            iba: data[type][0].strIBA,
            alcoholic: data[type][0].strAlcoholic,
            glass: data[type][0].strGlass,
            imageAttribution: data[type][0].strImageAttribution,
          } as DrinkRecipeType;

          setRecipe(drinkData);
        } else {
          const mealData = {
            ...baseRecipe,
            area: data[type][0].strArea,
            source: data[type][0].strSource,
          } as MealRecipeType;

          setRecipe(mealData);
        }
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
