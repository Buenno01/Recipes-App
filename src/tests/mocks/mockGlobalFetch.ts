import { vi } from 'vitest';
import * as drinksApiReturns from './drinksApiReturns';
import * as mealsApiReturns from './mealsApiReturns';

const BASE_MEAL_URL = /https:\/\/www.themealdb.com\/api\/json\/v1\/1\//;
const BASE_DRINK_URL = /https:\/\/www.thecocktaildb.com\/api\/json\/v1\/1\//;
const BY_NAME = /search.php\?s=/;
const BY_NAME_MEALS = /search.php\?s=Spicy Arrabiata Penne/i;
const BY_NAME_DRINKS = /search.php\?s=Auburn Headbanger/i;
const BY_CATEGORY_MEALS = /filter.php\?c=Beef/i;
const BY_CATEGORY_DRINKS = /filter.php\?c=Ordinary Drink/i;
const GET_CATEGORIES = /list.php\?c=list/;
const BY_FIRST_LETTER = /search.php\?f=f/i;
const BY_INGREDIENT_MEALS = /filter.php\?i=beef/i;
const BY_INGREDIENT_DRINKS = /filter.php\?i=vodka/i;
const NOT_FOUND = /non-existent/i;

export const globalFetchMock = () => vi
  .spyOn(global, 'fetch')
  .mockImplementation((endpoint) => Promise.resolve(Promise.resolve({
    json: async () => mockEndPoints(endpoint),
    ok: true,
    status: 200,
  } as Response)));

const mockEndPoints = (endpoint: any) => {
  const endpointString = endpoint.toString();
  if (BASE_MEAL_URL.test(endpointString)) return mockMeals(endpointString);
  if (BASE_DRINK_URL.test(endpointString)) return mockDrinks(endpointString);
  return {};
};

const mockMeals = (endpoint: string) => {
  let returnedData: any = mealsApiReturns.ById;

  if (GET_CATEGORIES.test(endpoint)) returnedData = mealsApiReturns.GetCategories;

  if (BY_NAME.test(endpoint)) returnedData = mealsApiReturns.ByName;

  if (BY_FIRST_LETTER.test(endpoint)) returnedData = mealsApiReturns.ByFirstLetter;

  if (BY_CATEGORY_MEALS.test(endpoint)) returnedData = mealsApiReturns.ByCategory;

  if (BY_NAME_MEALS.test(endpoint)) returnedData = mealsApiReturns.ById;

  if (BY_INGREDIENT_MEALS.test(endpoint)) returnedData = mealsApiReturns.ByIngredient;

  if (NOT_FOUND.test(endpoint)) returnedData = mealsApiReturns.NotFound;

  return returnedData;
};

const mockDrinks = (endpoint: string) => {
  let returnedData: any = drinksApiReturns.ById;

  if (GET_CATEGORIES.test(endpoint)) returnedData = drinksApiReturns.GetCategories;

  if (BY_NAME.test(endpoint)) returnedData = drinksApiReturns.ByName;

  if (BY_FIRST_LETTER.test(endpoint)) returnedData = drinksApiReturns.ByFirstLetter;

  if (BY_CATEGORY_DRINKS.test(endpoint)) returnedData = drinksApiReturns.ByCategory;

  if (BY_NAME_DRINKS.test(endpoint)) returnedData = drinksApiReturns.ById;

  if (BY_INGREDIENT_DRINKS.test(endpoint)) returnedData = drinksApiReturns.ByIngredient;

  if (NOT_FOUND.test(endpoint)) returnedData = drinksApiReturns.NotFound;

  return returnedData;
};
