import { vi } from 'vitest';
import { mealMock } from './mock';
import * as drinksApiReturns from './drinksApiReturns';

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
      return mealMock;
    case BASE_MEAL_URL + BY_NAME:
      return mealsListApiReturn;
    case `${BASE_MEAL_URL + BY_CATEGORY}Beef`:
      return mealsListApiReturnByCategory;
    case BASE_MEAL_URL + GET_CATEGORIES:
      return mealsCategoriesListApiReturn;
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

const mealsListApiReturn = {
  meals: [
    mealMock.meals[0],
    {
      ...mealMock.meals[0],
      idMeal: '52772',
      strMeal: 'Teriyaki Chicken Casserole',
      strCategory: 'Chicken',
    },
    {
      ...mealMock.meals[0],
      idMeal: '52773',
      strMeal: 'Pasta a La Maluquita',
      strCategory: 'Pasta',
    },
    {
      ...mealMock.meals[0],
      idMeal: '52774',
      strMeal: 'Beef with Garlic',
      strCategory: 'Beef',
    },
    {
      ...mealMock.meals[0],
      idMeal: '52775',
      strMeal: 'Salad',
      strCategory: 'Vegetarian',
    },
    {
      ...mealMock.meals[0],
      idMeal: '52776',
      strMeal: 'Sushi',
      strCategory: 'Seafood',
    },
    {
      ...mealMock.meals[0],
      idMeal: '52777',
      strMeal: 'Burguer',
      strCategory: 'Beef',
    },
    {
      ...mealMock.meals[0],
      idMeal: '52778',
      strMeal: 'Fries',
      strCategory: 'Side',
    },
    {
      ...mealMock.meals[0],
      idMeal: '52779',
      strMeal: 'Pizza',
      strCategory: 'Vegetarian',
    },
    {
      ...mealMock.meals[0],
      idMeal: '52780',
      strMeal: 'Taco',
      strCategory: 'Beef',
    },
    {
      ...mealMock.meals[0],
      idMeal: '52781',
      strMeal: 'Hot Dog',
      strCategory: 'Beef',
    },
    {
      ...mealMock.meals[0],
      idMeal: '52782',
      strMeal: 'Burrito',
      strCategory: 'Beef',
    },
    {
      ...mealMock.meals[0],
      idMeal: '52783',
      strMeal: 'Beets',
      strCategory: 'Vegetarian',
    },
  ],
};

const mealsListApiReturnByCategory = {
  meals: [
    mealMock.meals[0],
    {
      ...mealMock.meals[0],
      idMeal: '52772',
      strMeal: 'Beef 1',
      strCategory: 'Beef',
    },
    {
      ...mealMock.meals[0],
      idMeal: '52773',
      strMeal: 'Beef 2',
      strCategory: 'Beef',
    },
    {
      ...mealMock.meals[0],
      idMeal: '52774',
      strMeal: 'Beef with Garlic',
      strCategory: 'Beef',
    },
    {
      ...mealMock.meals[0],
      idMeal: '52775',
      strMeal: 'Beef a la maluquitos',
      strCategory: 'Beef',
    },
    {
      ...mealMock.meals[0],
      idMeal: '52776',
      strMeal: 'Beef Sushi',
      strCategory: 'Beef',
    },
    {
      ...mealMock.meals[0],
      idMeal: '52777',
      strMeal: 'Burguer',
      strCategory: 'Beef',
    },
    {
      ...mealMock.meals[0],
      idMeal: '52778',
      strMeal: 'Beef with Fries',
      strCategory: 'Beef',
    },
    {
      ...mealMock.meals[0],
      idMeal: '52779',
      strMeal: 'Beef Pizza',
      strCategory: 'Beef',
    },
    {
      ...mealMock.meals[0],
      idMeal: '52780',
      strMeal: 'Taco',
      strCategory: 'Beef',
    },
    {
      ...mealMock.meals[0],
      idMeal: '52781',
      strMeal: 'Hot Dog',
      strCategory: 'Beef',
    },
    {
      ...mealMock.meals[0],
      idMeal: '52782',
      strMeal: 'Burrito',
      strCategory: 'Beef',
    },
    {
      ...mealMock.meals[0],
      idMeal: '52783',
      strMeal: 'Beets with Beefs',
      strCategory: 'Beef',
    },
  ],
};

const mealsCategoriesListApiReturn = {
  meals: [
    {
      strCategory: 'Beef',
    },
    {
      strCategory: 'Chicken',
    },
    {
      strCategory: 'Vegetarian',
    },
    {
      strCategory: 'Seafood',
    },
    {
      strCategory: 'Side',
    },
    {
      strCategory: 'Pasta',
    },
    {
      strCategory: 'Dessert',
    },
    {
      strCategory: 'Breakfast',
    },
    {
      strCategory: 'Goat',
    },
    {
      strCategory: 'Lamb',
    },
    {
      strCategory: 'Pork',
    },
    {
      strCategory: 'Starter',
    },
    {
      strCategory: 'Vegan',
    },
    {
      strCategory: 'Miscellaneous',
    },
  ],
};
