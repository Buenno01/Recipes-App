import { vi } from 'vitest';
import * as fetchCategories from '../../hooks/useFetchCategories';
import * as fetchRecipesByName from '../../hooks/useFetchDrinkOrFoodByName';
import * as fetchRecipesById from '../../hooks/useFetchDrinkOrFoodById';
import * as fetchRecipesWithFilter from '../../hooks/useFetchRecipesWithFilter';
import * as fetchAPI from '../../services/fetchApi';
import {
  formattedMealMock as mealRecipe,
  mealCategoriesMock,
  mealFormattedSearchByNameMock as mealRecipeList,
} from './mealMocks';
import { RecipeOptionsType } from '../../@types/RecipeOptionsType';
import {
  formattedDrinkMock as drinkRecipe,
  formattedDrinkSearchByNameMock as drinkRecipeList,
} from './drinkMocks';
import { AnyRecipeType } from '../../@types/AnyRecipeType';

export const fetchCategoriesMock = (loading = false, error = '') => vi
  .spyOn(fetchCategories, 'default')
  .mockReturnValue({
    categories: mealCategoriesMock,
    loading,
    error,
  });

export const fetchRecipeByIdMock = (
  recipeType: RecipeOptionsType = 'meals',
  loading = false,
  error = '',
) => vi
  .spyOn(fetchRecipesById, 'default')
  .mockReturnValue({
    recipe: recipeType === 'meals' ? mealRecipe : drinkRecipe,
    loading,
    error,
  });

export const fetchRecipesByNameMock = (
  recipeType: RecipeOptionsType = 'meals',
  loading = false,
  error = '',
) => vi
  .spyOn(fetchRecipesByName, 'default')
  .mockReturnValue({
    recipes: recipeType === 'meals' ? mealRecipeList : drinkRecipeList,
    loading,
    error,
  });

export const customFetchRecipesByIDMock = (
  recipe: AnyRecipeType | undefined,
  loading = false,
  error = '',
) => vi
  .spyOn(fetchRecipesById, 'default')
  .mockReturnValue({
    recipe,
    loading,
    error,
  });

export const fetchRecipesWithFilterMock = (
  recipeType: RecipeOptionsType = 'meals',
  loading = false,
  error = '',
  category = '',
) => vi
  .spyOn(fetchRecipesWithFilter, 'default')
  .mockReturnValue({
    recipes: recipeType === 'meals' ? mealRecipeList : drinkRecipeList,
    loading,
    error,
    category,
    setCategory: () => {},
    setType: () => {},
  });

export const mockFetchApiModule = () => {
  const fetchAny = vi.spyOn(fetchAPI, 'fetchAny');
  const fetchDrinkById = vi.spyOn(fetchAPI, 'fetchDrinkById')
    .mockReturnValue(Promise.resolve(drinkRecipe));
  const fetchDrinkByName = vi.spyOn(fetchAPI, 'fetchDrinkByName')
    .mockReturnValue(Promise.resolve(drinkRecipeList));
  const fetchDrinkByCategory = vi.spyOn(fetchAPI, 'fetchDrinkByCategory')
    .mockImplementation(async (category) => {
      if (category === '') return (mealCategoriesMock);
      return (drinkRecipeList);
    });
  const fetchMealById = vi.spyOn(fetchAPI, 'fetchMealById')
    .mockReturnValue(Promise.resolve(mealRecipe));
  const fetchMealByName = vi.spyOn(fetchAPI, 'fetchMealByName')
    .mockReturnValue(Promise.resolve(mealRecipeList));
  const fetchMealByCategory = vi.spyOn(fetchAPI, 'fetchMealByCategory')
    .mockImplementation(async (category) => {
      if (category === '') return (mealCategoriesMock);
      return (mealRecipeList);
    });

  return {
    fetchAny,
    fetchDrinkById,
    fetchDrinkByName,
    fetchDrinkByCategory,
    fetchMealById,
    fetchMealByName,
    fetchMealByCategory,
  };
};
