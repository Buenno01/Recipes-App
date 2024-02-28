export type DoneRecipeType = {
  id: string,
  type: 'meal' | 'drink',
  nationality: string,
  category: string,
  alcoholicOrNot: 'alcoholic' | 'non-alcoholic' | null,
  name: string,
  image: string,
  doneDate: string,
  tags: string[]
};

export type DoneRecipeProps = {
  doneRecipe: DoneRecipeType,
  index: number
};
