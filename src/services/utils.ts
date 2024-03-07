import { AnyRecipeType } from '../@types/AnyRecipeType';
import { BasicRecipeInfoType } from '../@types/BasicRecipeInfoType';
import { DrinkRecipeType } from '../@types/DrinkRecipeType';
import { MealRecipeType } from '../@types/MealRecipeType';
import { RecipeOptionsType } from '../@types/RecipeOptionsType';

type GetIngredientsAndMeasuresReturnType = {
  ingredients: string[];
  measures: string[];
};

type APICategoryType = { strCategory: string };

export const formatRecipeListToBasic = (
  data: any[],
): BasicRecipeInfoType[] => {
  if (!data) return [];
  const type = checkRecipeType(data[0]);
  return data.map((item) => ({
    name: type === 'meals' ? item.strMeal : item.strDrink,
    thumb: type === 'meals' ? item.strMealThumb : item.strDrinkThumb,
    id: type === 'meals' ? item.idMeal : item.idDrink,
  }));
};

export const formatRecipeListToType = (data: any[]): AnyRecipeType[] => {
  if (!data || data.length === 0) return [];
  const type = checkRecipeType(data[0]);
  if (type === 'meals') {
    return data.map((item) => formatToMealRecipeType(item));
  }
  return data.map((item) => formatToDrinkRecipeType(item));
};

export const formatCategories = (data: APICategoryType[]): string[] => data
  .map(({ strCategory }) => strCategory);

function getIngredientsAndMeasures(data: any): GetIngredientsAndMeasuresReturnType {
  const entries = Object.entries(data) as [string, string][];
  const ingredients = entries.filter(
    ([key, value]) => key.includes('strIngredient') && value,
  ).map(([, value]) => value);
  const measures = entries.filter(
    ([key, value]) => key.includes('strMeasure') && value,
  ).map(([, value]) => value);
  return { ingredients, measures };
}

function getTagsArray(tags: string): string[] {
  if (!tags) return [];
  return tags.split(',');
}

function formatToMealRecipeType(data: any): MealRecipeType {
  const { ingredients, measures } = getIngredientsAndMeasures(data);
  return {
    type: 'meals',
    id: data.idMeal,
    name: data.strMeal,
    drinkAlternate: data.strDrinkAlternate,
    category: data.strCategory,
    instructions: data.strInstructions,
    thumb: data.strMealThumb,
    tags: getTagsArray(data.strTags),
    video: data.strYoutube,
    ingredients: ingredients as string[],
    measures: measures as string[],
    dateModified: data.dateModified,
    creativeCommonsConfirmed: data.strCreativeCommonsConfirmed,
    imageSource: data.strImageSource,
    area: data.strArea,
    source: data.strSource,
  } as MealRecipeType;
}

function formatToDrinkRecipeType(data: any): DrinkRecipeType {
  const { ingredients, measures } = getIngredientsAndMeasures(data);
  return {
    type: 'drinks',
    id: data.idDrink,
    name: data.strDrink,
    drinkAlternate: data.strDrinkAlternate,
    category: data.strCategory,
    instructions: data.strInstructions,
    thumb: data.strDrinkThumb,
    tags: getTagsArray(data.strTags),
    video: data.strVideo,
    ingredients: ingredients as string[],
    measures: measures as string[],
    dateModified: data.dateModified,
    creativeCommonsConfirmed: data.strCreativeCommonsConfirmed,
    imageSource: data.strImageSource,
    iba: data.strIBA,
    alcoholic: data.strAlcoholic,
    glass: data.strGlass,
    imageAttribution: data.strImageAttribution,
  } as DrinkRecipeType;
}

function checkRecipeType(data: any): RecipeOptionsType {
  return data.idMeal ? 'meals' : 'drinks';
}
