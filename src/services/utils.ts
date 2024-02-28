import { RecipeType } from '../@types/RecipeType';

export const formatRecipeType = (data: any): RecipeType => {
  const entries = Object.entries(data);
  const ingredients = entries.filter(
    ([key, value]) => key.includes('strIngredient') && value,
  ).map(([, value]) => value);
  const measures = entries.filter(
    ([key, value]) => key.includes('strMeasure') && value,
  ).map(([, value]) => value);
  let formattedData;
  if (data?.idDrink) {
    formattedData = {
      type: 'drinks',
      id: data.idDrink,
      name: data.strDrink,
      drinkAlternate: data.strDrinkAlternate,
      category: data.strCategory,
      instructions: data.strInstructions,
      thumb: data.strDrinkThumb,
      tags: data.strTags,
      video: data.strVideo,
      ingredients: ingredients as string[],
      measures: measures as string[],
      dateModified: data.dateModified,
      creativeCommonsConfirmed: data.strCreativeCommonsConfirmed,
      imageSource: data.strImageSource,
    };
  } else {
    formattedData = {
      type: 'meals',
      id: data.idMeal,
      name: data.strMeal,
      drinkAlternate: data.strDrinkAlternate,
      category: data.strCategory,
      instructions: data.strInstructions,
      thumb: data.strMealThumb,
      tags: data.strTags,
      video: data.strYoutube,
      ingredients: ingredients as string[],
      measures: measures as string[],
      dateModified: data.dateModified,
      creativeCommonsConfirmed: data.strCreativeCommonsConfirmed,
      imageSource: data.strImageSource,
    };
  }

  return formattedData as RecipeType;
};
