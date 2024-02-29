export type DoneRecipeType = {
  id: string,
  type: 'meal' | 'drink',
  nationality: string | null,
  category: string | null,
  alcoholicOrNot: 'alcoholic' | 'non-alcoholic' | null,
  name: string,
  image: string,
  doneDate: string,
  tags: string[] | null,
};

export type DoneRecipeProps = {
  doneRecipe: DoneRecipeType,
  index: number
};
