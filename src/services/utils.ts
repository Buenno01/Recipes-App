import { AnyRecipeType } from '../@types/AnyRecipeType';
import { DrinkRecipeType } from '../@types/DrinkRecipeType';
import { MealRecipeType } from '../@types/MealRecipeType';

type GetIngredientsAndMeasuresReturnType = {
  ingredients: string[];
  measures: string[];
};

type APICategoryType = { strCategory: string };

export const formatRecipeType = (data: any): AnyRecipeType => {
  let formattedData;
  if (data?.idDrink) {
    formattedData = formatToDrinkRecipeType(data);
  } else {
    formattedData = formatToMealRecipeType(data);
  }

  return formattedData as AnyRecipeType;
};

export const formatRecipeListToType = (data: any[], type: string): AnyRecipeType[] => {
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
