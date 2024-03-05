import { useEffect, useState } from 'react';
import { RecipeOptionsType } from '../@types/RecipeOptionsType';
import { AnyRecipeType } from '../@types/AnyRecipeType';
import { fetchAny } from '../services/fetchApi';

type UseFetchRecipesWithFilterReturnType = {
  recipes: AnyRecipeType[];
  loading: boolean;
  error: string;
  category: string;
  setCategory: (category: string) => void;
  setType: (type: RecipeOptionsType) => void;
};

const useFetchRecipesWithFilter = (recipeType: RecipeOptionsType)
: UseFetchRecipesWithFilterReturnType => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [recipes, setRecipes] = useState<AnyRecipeType[]>([]);
  const [category, setCategory] = useState('');
  const [type, setType] = useState<RecipeOptionsType>(recipeType);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        let data: AnyRecipeType[];
        setLoading(true);
        if (category !== '') {
          data = await fetchAny(category, type, 'category') as AnyRecipeType[];
          setRecipes(data);
        } else {
          data = await fetchAny('', type, 'name') as AnyRecipeType[];
          setRecipes(data);
        }
      } catch (err) {
        if (err instanceof Error) setError(err.message ?? 'Error fetching recipes');
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
    category,
    setCategory,
    setType,
  };
};

export default useFetchRecipesWithFilter;
