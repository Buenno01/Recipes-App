import { MealRecipeType } from '../../@types/MealRecipeType';

const MEAL_THUMB = 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg';

export const formattedMealMock: MealRecipeType = {
  type: 'meals',
  id: '52771',
  category: 'Vegetarian',
  name: 'Spicy Arrabiata Penne',
  thumb: MEAL_THUMB,
  area: 'Italian',
  instructions: 'Cook the pasta in a pan',
  video: 'https://www.youtube.com/watch?v=1IszT_guI08',
  tags: null,
  ingredients: [
    'Penne Rigate',
    'Olive Oil',
    'Garlic',
    'Red Chilli',
    'Italian Tomatoes',
    'Dried Oregano',
    'Red Wine',
    'Fresh Basil',
    'Salt',
    'Black Pepper',
    'Parmesan',
    'Water',
  ],
  measures: [
    '1 pound',
    '1/4 cup',
    '1 clove',
    '1',
    '1 tin',
    '1 teaspoon',
    '1/2 cup',
    '6 leaves',
    'to taste',
    'to taste',
    'to taste',
    '1/2 cup',
  ],
  dateModified: null,
  creativeCommonsConfirmed: null,
  imageSource: null,
  drinkAlternate: null,
  source: '',
};

export const mealFormattedSearchByNameMock: MealRecipeType[] = [
  {
    ...formattedMealMock,
  },
  {
    ...formattedMealMock,
    id: '52772',
    name: 'Teriyaki Chicken',
    category: 'Chicken',
  },
  {
    ...formattedMealMock,
    id: '52773',
    name: 'Salad',
    category: 'Vegetarian',
  },
  {
    ...formattedMealMock,
    id: '52774',
    name: 'Pasta',
    category: 'Pasta',
  },
  {
    ...formattedMealMock,
    id: '52775',
    name: 'Pizza',
    category: 'Vegetarian',
  },
  {
    ...formattedMealMock,
    id: '52776',
    name: 'Sushi',
    category: 'Seafood',
  },
  {
    ...formattedMealMock,
    id: '52777',
    name: 'Burger',
    category: 'Beef',
  },
  {
    ...formattedMealMock,
    id: '52778',
    name: 'Fries',
    category: 'Side',
  },
  {
    ...formattedMealMock,
    id: '52779',
    name: 'Hot Dog',
    category: 'Beef',
  },
  {
    ...formattedMealMock,
    id: '52780',
    name: 'Taco',
    category: 'Beef',
  },
  {
    ...formattedMealMock,
    id: '52781',
    name: 'Burrito',
    category: 'Beef',
  },
  {
    ...formattedMealMock,
    id: '52782',
    name: 'Beets',
    category: 'Vegetarian',
  },
  {
    ...formattedMealMock,
    id: '52783',
    name: 'Soup',
    category: 'Miscellaneous',
  },
  {
    ...formattedMealMock,
    id: '52784',
    name: 'Stew',
    category: 'Miscellaneous',
  },
];

export const mealCategoriesMock = [
  'Beef',
  'Breakfast',
  'Chicken',
  'Dessert',
  'Goat',
  'Lamb',
  'Miscellaneous',
  'Pasta',
  'Pork',
  'Seafood',
  'Side',
  'Starter',
  'Vegan',
  'Vegetarian',
];

export const favoriteMealMock = {
  id: '52771',
  type: 'meal',
  nationality: 'Italian',
  category: 'Vegetarian',
  name: 'Spicy Arrabiata Penne',
  image: 'https://www.themealsdb.com/images/media/meal/fs6kiq1513708455.jpg',
  alcoholicOrNot: '',
};
