import { AnyRecipeType } from '../@types/AnyRecipeType';
import { BasicRecipeInfoType } from '../@types/BasicRecipeInfoType';
import { RecipeOptionsType } from '../@types/RecipeOptionsType';
import {
  formatCategories,
  formatRecipeListToBasic,
  formatRecipeListToType,
} from './utils';

const BASE_MEAL_URL = 'https://www.themealdb.com/api/json/v1/1/';
const BASE_DRINK_URL = 'https://www.thecocktaildb.com/api/json/v1/1/';

type EndpointOptions = {
  name: string;
  category: string;
  id: string;
  firstLetter: string;
  ingredient: string;
  categories: string;
};

export type EndpointOptionsKeys = keyof EndpointOptions;

const ENDPOINTS: EndpointOptions = {
  name: 'search.php?s=',
  category: 'filter.php?c=',
  id: 'lookup.php?i=',
  firstLetter: 'search.php?f=',
  ingredient: 'filter.php?i=',
  categories: 'list.php?c=list',
};

const returnResolved = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const buildUrl = (
  which: RecipeOptionsType,
  endpoint: EndpointOptionsKeys,
  param: string = '',
): string => {
  let url = which === 'meals' ? BASE_MEAL_URL : BASE_DRINK_URL;
  url += ENDPOINTS[endpoint] + param;

  return url;
};

export const fetchAny = async (
  param: string,
  recipeType: RecipeOptionsType,
  endpoint: EndpointOptionsKeys,
): Promise<BasicRecipeInfoType[] | AnyRecipeType[] | string[]> => {
  buildUrl(recipeType, endpoint, param);
  const response = await returnResolved(buildUrl(recipeType, endpoint, param));
  switch (endpoint) {
    case 'name':
    case 'category':
    case 'firstLetter':
    case 'id':
      return formatRecipeListToType(response[recipeType]) as AnyRecipeType[];
    case 'ingredient':
      return formatRecipeListToBasic(response[recipeType]) as BasicRecipeInfoType[];
    case 'categories':
      return formatCategories(response[recipeType]) as string[];
    default:
      return [];
  }
};
