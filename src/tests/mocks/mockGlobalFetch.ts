import { vi } from 'vitest';
import * as drinksApiReturns from './drinksApiReturns';
import * as mealsApiReturns from './mealsApiReturns';

const BASE_MEAL_URL = 'https://www.themealdb.com/api/json/v1/1/';
const BASE_DRINK_URL = 'https://www.thecocktaildb.com/api/json/v1/1/';
const BY_NAME = 'search.php?s=';
const BY_ID = 'lookup.php?i=';
const BY_CATEGORY = 'filter.php?c=';
const GET_CATEGORIES = 'list.php?c=list';

export const globalFetchMock = () => vi
  .spyOn(global, 'fetch')
  .mockImplementation((endpoint) => Promise.resolve(Promise.resolve({
    json: async () => mockEndPoints(endpoint),
    ok: true,
    status: 200,
  } as Response)));

const mockEndPoints = (endpoint: any) => {
  switch (endpoint) {
    case endpoint.includes(BASE_MEAL_URL + BY_ID):
      return mealsApiReturns.ById;
    case BASE_MEAL_URL + BY_NAME:
      return mealsApiReturns.ByName;
    case `${BASE_MEAL_URL + BY_CATEGORY}Beef`:
      return mealsApiReturns.ByCategory;
    case BASE_MEAL_URL + GET_CATEGORIES:
      return mealsApiReturns.GetCategories;
    case endpoint.includes(BASE_DRINK_URL + BY_ID):
      return drinksApiReturns.ById;
    case BASE_DRINK_URL + GET_CATEGORIES:
      return drinksApiReturns.GetCategories;
    case BASE_DRINK_URL + BY_NAME:
      return drinksApiReturns.ByName;
    case `${BASE_DRINK_URL + BY_CATEGORY}Ordinary Drink`:
      return drinksApiReturns.ByCategory;
    default:
      return {};
  }
};
