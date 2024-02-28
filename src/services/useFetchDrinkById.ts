import { useEffect, useState } from 'react';
import { DrinkRecipeType } from '../@types/DrinkRecipeType';
import { formatRecipeType } from './utils';

type ReturnUseFetchDrinkByIdType = {
  drink: DrinkRecipeType | undefined;
  loading: boolean;
  error: string;
};

const useFetchDrinkById = (id: string): ReturnUseFetchDrinkByIdType => {
  const [drink, setDrink] = useState<DrinkRecipeType>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDrinkById = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await response.json();
        const baseRecipe = formatRecipeType(data.drinks[0]);
        setDrink({
          ...baseRecipe,
          iba: data.drinks[0].strIBA,
          alcoholic: data.drinks[0].strAlcoholic,
          glass: data.drinks[0].strGlass,
          imageAttribution: data.drinks[0].strImageAttribution,
        } as DrinkRecipeType);
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

    fetchDrinkById();
  }, [id]);

  return { drink, loading, error };
};

export default useFetchDrinkById;
