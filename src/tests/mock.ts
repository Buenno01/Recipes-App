import { DoneRecipeType } from '../@types/DoneRecipeType';
import { MealRecipeType } from '../@types/MealRecipeType';

const MEAL_THUMB = 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg';

export const mealMock = {
  meals: [{
    idMeal: '52771',
    strMeal: 'Spicy Arrabiata Penne',
    strCategory: 'Vegetarian',
    strArea: 'Italian',
    strInstructions: 'Cook the pasta in a pan',
    strMealThumb: MEAL_THUMB,
    strYoutube: 'https://www.youtube.com/watch?v=1IszT_guI08',
    strIngredient1: 'Penne Rigate',
    strIngredient2: 'Olive Oil',
    strIngredient3: 'Garlic',
    strIngredient4: 'Red Chilli',
    strIngredient5: 'Italian Tomatoes',
    strIngredient6: 'Dried Oregano',
    strIngredient7: 'Red Wine',
    strIngredient8: 'Fresh Basil',
    strIngredient9: 'Salt',
    strIngredient10: 'Black Pepper',
    strIngredient11: 'Parmesan',
    strIngredient12: 'Water',
    strIngredient13: '',
    strIngredient14: '',
    strIngredient15: '',
    strIngredient16: '',
    strIngredient17: '',
    strIngredient18: '',
    strIngredient19: '',
    strIngredient20: '',
    strMeasure1: '1 pound',
    strMeasure2: '1/4 cup',
    strMeasure3: '1 clove',
    strMeasure4: '1',
    strMeasure5: '1 tin',
    strMeasure6: '1 teaspoon',
    strMeasure7: '1/2 cup',
    strMeasure8: '6 leaves',
    strMeasure9: 'to taste',
    strMeasure10: 'to taste',
    strMeasure11: 'to taste',
    strMeasure12: '1/2 cup',
    strMeasure13: '',
    strMeasure14: '',
    strMeasure15: '',
    strMeasure16: '',
    strMeasure17: '',
    strMeasure18: '',
    strMeasure19: '',
    strMeasure20: '',
  }] };

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
  },
  {
    ...formattedMealMock,
    id: '52773',
    name: 'Salad',
  },
  {
    ...formattedMealMock,
    id: '52774',
    name: 'Pasta',
  },
  {
    ...formattedMealMock,
    id: '52775',
    name: 'Pizza',
  },
  {
    ...formattedMealMock,
    id: '52776',
    name: 'Sushi',
  },
  {
    ...formattedMealMock,
    id: '52777',
    name: 'Burger',
  },
  {
    ...formattedMealMock,
    id: '52778',
    name: 'Fries',
  },
];

export const mealSearchedByIDMock = { meals:
    [
      { idMeal: '52772',
        strMeal: 'Teriyaki Chicken Casserole',
        strDrinkAlternate: null,
        strCategory: 'Chicken',
        strArea: 'Japanese',
        strInstructions: 'Preheat oven to 350\u00b0 F. Spray a 9x13-inch baking pan with'
        + ' non-stick spray.\r\nCombine soy sauce, \u00bd cup water, brown sugar,'
        + ' ginger and garlic in a small saucepan and cover. Bring to a boil over'
        + 'medium heat. Remove lid and cook for one minute once'
        + '  boiling.\r\nMeanwhile, stir together the corn'
        + ' starch and 2 tablespoons of water in a separate dish until smooth.'
        + ' Once sauce'
        + ' is boiling, add mixture to the saucepan and stir to combine. Cook until the'
        + ' sauce starts to thicken then remove from heat.\r\nPlace the chicken breasts'
        + ' in the prepared pan. Pour one cup of the sauce over top of chicken. Place'
        + ' chicken in oven and bake 35 minutes or until cooked through. Remove from'
        + ' oven and shred chicken in the dish using two forks.\r\n*Meanwhile, steam'
        + ' or cook the vegetables according to package directions.\r\nAdd the cooked'
        + ' vegetables and rice to the casserole dish with the chicken. Add most of the'
        + ' remaining sauce, reserving a bit to drizzle over the top when serving.'
        + ' Gently toss everything together in the casserole dish until combined.'
        + ' Return to oven and cook 15 minutes.'
        + ' Remove from oven and let stand 5 minutes before serving.'
        + ' Drizzle each serving with remaining sauce. Enjoy!',
        strMealThumb: 'https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg',
        strTags: 'Meat,Casserole',
        strYoutube: 'https://www.youtube.com/watch?v=4aZr5hZXP_s',
        strIngredient1: 'soy sauce',
        strIngredient2: 'water',
        strIngredient3: 'brown sugar',
        strIngredient4: 'ground ginger',
        strIngredient5: 'minced garlic',
        strIngredient6: 'cornstarch',
        strIngredient7: 'chicken breasts',
        strIngredient8: 'stir-fry vegetables',
        strIngredient9: 'brown rice',
        strIngredient10: '',
        strIngredient11: '',
        strIngredient12: '',
        strIngredient13: '',
        strIngredient14: '',
        strIngredient15: '',
        strIngredient16: null,
        strIngredient17: null,
        strIngredient18: null,
        strIngredient19: null,
        strIngredient20: null,
        strMeasure1: '3/4 cup',
        strMeasure2: '1/2 cup',
        strMeasure3: '1/4 cup',
        strMeasure4: '1/2 teaspoon',
        strMeasure5: '1/2 teaspoon',
        strMeasure6: '4 Tablespoons',
        strMeasure7: '2',
        strMeasure8: '1 (12 oz.)',
        strMeasure9: '3 cups',
        strMeasure10: '',
        strMeasure11: '',
        strMeasure12: '',
        strMeasure13: '',
        strMeasure14: '',
        strMeasure15: '',
        strMeasure16: null,
        strMeasure17: null,
        strMeasure18: null,
        strMeasure19: null,
        strMeasure20: null,
        strSource: null,
        strImageSource: null,
        strCreativeCommonsConfirmed: null,
        dateModified: null }] };

export const doneRecipesMock: DoneRecipeType[] = [{
  id: '52772',
  type: 'meal',
  nationality: 'Japanese',
  category: 'Chicken',
  alcoholicOrNot: '',
  name: 'Teriyaki Chicken Casserole',
  image: MEAL_THUMB,
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

export const doneRecipesMockLocalStorage = '[{"id":"52772","type":"meal","nationality":"Japanese","category":"Chicken","alcoholicOrNot":"","name":"Teriyaki Chicken Casserole","image":"https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg","doneDate":"2017-12-19 18:34:15","tags":["Soup","Chicken","Tag Que Não Deve Ser Mostrada"]},{"id":"17256","name":"Martinez 2","type":"drink","nationality":"","category":"Cocktail","alcoholicOrNot":"Alcoholic","image":"https://www.thecocktaildb.com/images/media/drink/fs6kiq1513708455.jpg","doneDate":"2017-12-19 18:34:15","tags":[""]}]';
