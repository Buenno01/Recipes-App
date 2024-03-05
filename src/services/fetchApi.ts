import { AnyRecipeType } from '../@types/AnyRecipeType';
import { DrinkRecipeType } from '../@types/DrinkRecipeType';
import { MealRecipeType } from '../@types/MealRecipeType';
import { RecipeOptionsType } from '../@types/RecipeOptionsType';
import { formatCategories, formatRecipeListToType, formatRecipeType } from './utils';

const BASE_MEAL_URL = 'https://www.themealdb.com/api/json/v1/1/';
const BASE_DRINK_URL = 'https://www.thecocktaildb.com/api/json/v1/1/';
const BY_NAME = 'search.php?s=';
const BY_ID = 'lookup.php?i=';
const BY_CATEGORY = 'filter.php?c=';
const GET_CATEGORIES = 'list.php?c=list';

export const fetchMealById = async (id: string): Promise<MealRecipeType> => {
  const response = await fetch(BASE_MEAL_URL + BY_ID + id);
  const data = await response.json();
  return formatRecipeType(data.meals[0]) as MealRecipeType;
};

export const fetchMealByName = async (name: string = ''): Promise<MealRecipeType[]> => {
  const response = await fetch(BASE_MEAL_URL + BY_NAME + name);
  const data = await response.json();
  return formatRecipeListToType(data.meals, 'meals') as MealRecipeType[];
};

export const fetchMealByCategory = async (category: string = '')
: Promise<MealRecipeType[] | string[]> => {
  let response;
  if (category === '') {
    response = await fetch(BASE_MEAL_URL + GET_CATEGORIES);
  } else {
    response = await fetch(BASE_MEAL_URL + BY_CATEGORY + category);
  }
  const data = await response.json();
  if (category === '') return formatCategories(data.meals) as string[];
  return formatRecipeListToType(data.meals, 'meals') as MealRecipeType[];
};

export const fetchDrinkById = async (id: string): Promise<DrinkRecipeType> => {
  const response = await fetch(BASE_DRINK_URL + BY_ID + id);
  const data = await response.json();
  return formatRecipeType(data.drinks[0]) as DrinkRecipeType;
};

export const fetchDrinkByName = async (name: string = ''): Promise<DrinkRecipeType[]> => {
  const response = await fetch(BASE_DRINK_URL + BY_NAME + name);
  const data = await response.json();
  return formatRecipeListToType(data.drinks, 'drinks') as DrinkRecipeType[];
};

export const fetchDrinkByCategory = async (category: string = '') => {
  let response;
  if (category === '') {
    response = await fetch(BASE_DRINK_URL + GET_CATEGORIES);
  } else {
    response = await fetch(BASE_DRINK_URL + BY_CATEGORY + category);
  }
  const data = await response.json();
  if (category === '') return formatCategories(data.drinks) as string[];
  return formatRecipeListToType(data.drinks, 'drinks') as DrinkRecipeType[];
};

export const fetchAny = async (
  param: string,
  recipeType: RecipeOptionsType,
  endpoint: 'name' | 'category' | 'id',
): Promise<AnyRecipeType | AnyRecipeType[] | string[] | undefined> => {
  switch (endpoint) {
    case 'name':
      if (recipeType === 'meals') return fetchMealByName(param);
      return fetchDrinkByName(param);
    case 'category':
      if (recipeType === 'meals') return fetchMealByCategory(param);
      return fetchDrinkByCategory(param);
    case 'id':
      if (recipeType === 'meals') return fetchMealById(param);
      return fetchDrinkById(param);
    default:
      return undefined;
  }
};
