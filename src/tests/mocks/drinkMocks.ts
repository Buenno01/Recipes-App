import { DrinkRecipeType } from '../../@types/DrinkRecipeType';
import { FavoriteRecipeType } from '../../@types/FavoriteRecipeType';

export const formattedDrinkMock: DrinkRecipeType = {
  type: 'drinks',
  id: '17256',
  category: 'Cocktail',
  name: 'Martinez',
  thumb: 'https://www.thecocktaildb.com/images/media/drink/fs6kiq1513708455.jpg',
  instructions: 'Stir all ingredients with ice, strain into a cocktail glass, and serve.',
  video: '',
  tags: [''],
  ingredients: [
    'Gin',
    'Sweet Vermouth',
    'Orange Bitters',
    'Cherry',
  ],
  measures: [
    '1 oz',
    '1 oz',
    '2 dashes',
    '1',
  ],
  dateModified: null,
  creativeCommonsConfirmed: null,
  imageSource: null,
  drinkAlternate: null,
  alcoholic: 'Alcoholic',
  glass: 'Cocktail glass',
  iba: 'Unforgettables',
  imageAttribution: null,
};

export const formattedDrinkSearchByNameMock: DrinkRecipeType[] = [
  {
    ...formattedDrinkMock,
    name: 'Martinez 2',
    id: '17256',
  },
  {
    ...formattedDrinkMock,
    name: 'Cuba Libre',
    id: '17257',
  },
  {
    ...formattedDrinkMock,
    name: 'Margarita',
    id: '17258',
  },
  {
    ...formattedDrinkMock,
    name: 'Mojito',
    id: '17259',
  },
  {
    ...formattedDrinkMock,
    name: 'Old Fashioned',
    id: '17260',
  },
  {
    ...formattedDrinkMock,
    name: 'Whiskey Sour',
    id: '17261',
  },
  {
    ...formattedDrinkMock,
    name: 'Dry Martini',
    id: '17262',
  },
  {
    ...formattedDrinkMock,
    name: 'Daiquiri',
    id: '17263',
  },
  {
    ...formattedDrinkMock,
    name: 'Espresso Martini',
    id: '17264',
  },
  {
    ...formattedDrinkMock,
    name: 'Gin Fizz',
    id: '17265',
  },
  {
    ...formattedDrinkMock,
    name: 'Mai Tai',
    id: '17266',
  },
  {
    ...formattedDrinkMock,
    name: 'Mimosa',
    id: '17267',
  },
  {
    ...formattedDrinkMock,
    name: 'Moscow Mule',
    id: '17268',
  },
  {
    ...formattedDrinkMock,
    name: 'Negroni',
    id: '17269',
  },
];

export const favoriteDrinkMock: FavoriteRecipeType = {
  id: '17256',
  type: 'drink',
  nationality: '',
  category: 'Cocktail',
  name: 'Martinez',
  image: 'https://www.thecocktaildb.com/images/media/drink/fs6kiq1513708455.jpg',
  alcoholicOrNot: 'Alcoholic',
};
