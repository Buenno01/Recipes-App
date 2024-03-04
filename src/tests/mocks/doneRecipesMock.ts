import { DoneRecipeType } from '../../@types/DoneRecipeType';

export const DONE_RECIPES_MOCK: DoneRecipeType[] = [{
  id: '52772',
  type: 'meal',
  nationality: 'Japanese',
  category: 'Chicken',
  alcoholicOrNot: '',
  name: 'Teriyaki Chicken Casserole',
  image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  doneDate: '2017-12-19 18:34:15',
  tags: ['Soup', 'Chicken', 'Tag Que Não Deve Ser Mostrada'],
},
{
  id: '17256',
  name: 'Martinez 2',
  type: 'drink',
  nationality: '',
  category: 'Cocktail',
  alcoholicOrNot: 'Alcoholic',
  image: 'https://www.thecocktaildb.com/images/media/drink/fs6kiq1513708455.jpg',
  doneDate: '2017-12-19 18:34:15',
  tags: [''],
}];

export const DONE_RECIPES_MOCK_LOCAL_STORAGE = '[{"id":"52772","type":"meal","nationality":"Japanese","category":"Chicken","alcoholicOrNot":"","name":"Teriyaki Chicken Casserole","image":"https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg","doneDate":"2017-12-19 18:34:15","tags":["Soup","Chicken","Tag Que Não Deve Ser Mostrada"]},{"id":"17256","name":"Martinez 2","type":"drink","nationality":"","category":"Cocktail","alcoholicOrNot":"Alcoholic","image":"https://www.thecocktaildb.com/images/media/drink/fs6kiq1513708455.jpg","doneDate":"2017-12-19 18:34:15","tags":[""]}]';
