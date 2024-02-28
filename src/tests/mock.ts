import { DoneRecipeType } from '../@types/DoneRecipeType';

export const DONE_RECIPES_MOCK: DoneRecipeType[] = [{
  id: 'ab123',
  name: 'frango à passarinho',
  type: 'meal',
  nationality: 'Brazilian',
  category: 'food',
  doneDate: '22/05/2024',
  imageSource: 'https://pbs.twimg.com/profile_images/1574869347079692296/QpY7cGuV_400x400.jpg',
  alcoholicOrNot: 'non-alcoholic',
  tags: 'frito',
  drinkAlternate: null,
  instructions: '',
  thumb: '',
  video: '',
  ingredients: ['a', 'b'],
  measures: ['a', 'b'],
  dateModified: '01/01/2000',
  creativeCommonsConfirmed: '',
}];
