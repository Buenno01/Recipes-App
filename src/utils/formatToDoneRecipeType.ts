import { DoneRecipeType } from '../@types/DoneRecipeType';

export const formatToDoneRecipeType = (obj: { type: string;
  [key: string]: any }): DoneRecipeType => {
  const { type, ...otherKeys } = obj;
  return { type, ...otherKeys } as DoneRecipeType;
};
