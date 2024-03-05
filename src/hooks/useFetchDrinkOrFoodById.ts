import { useEffect, useState } from 'react';
import { RecipeOptionsType } from '../@types/RecipeOptionsType';
import { AnyRecipeType } from '../@types/AnyRecipeType';
import { fetchAny } from '../services/fetchApi';

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

        const data = await fetchAny(id, type, 'id');

        setRecipe(data as AnyRecipeType);
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
