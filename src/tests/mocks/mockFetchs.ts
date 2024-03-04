import { vi } from 'vitest';
import * as fetchCategories from '../../hooks/useFetchCategories';
import * as fetchRecipesByName from '../../services/useFetchDrinkOrFoodByName';
import * as fetchRecipesById from '../../services/useFetchDrinkOrFoodById';
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
