import { EndpointOptionsKeys } from '../services/fetchApi';
import { BasicRecipeInfoType } from './BasicRecipeInfoType';
import { RecipeOptionsType } from './RecipeOptionsType';

export type FetchParamsType = {
  param: string;
  recipeType: RecipeOptionsType | undefined;
  endpoint: Omit<EndpointOptionsKeys, 'categories' | 'id'>;
};

export type RecipesContextType = {
  fetchParams: FetchParamsType;
  setFetchParams: (params: FetchParamsType) => void;
  recipes: BasicRecipeInfoType[];
  error: string;
  loading: boolean;
};
