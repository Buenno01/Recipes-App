export const ById = {
  drinks: [
    {
      idDrink: '17256',
      strDrink: 'Auburn Headbanger',
      strDrinkAlternate: null,
      strTags: null,
      strVideo: null,
      strCategory: 'Shot',
      strIBA: null,
      strAlcoholic: 'Alcoholic',
      strGlass: 'Shot glass',
      strInstructions: `Mix in spread glass over ice. 
      Strain and pour in shot glass. Sit down before shotting. ENJOY!!`,
      strInstructionsES: `Mezclar en un vaso con hielo. 
      Colar y verter en el vaso. Siéntate antes de beber. ¡DISFRUTAR!`,
      strInstructionsDE: `Streuglas mit Eis einrühren. 
      Abseihen und in ein Schnapsglas gießen. 
      Setz dich hin, bevor du schießt. GENIEßEN SIE ES!!!!`,
      strInstructionsFR: null,
      strInstructionsIT: `Mescolare in un bicchiere 
      con del ghiaccio.\r\nFiltrare e versare in un bicchierino.`,
      'strInstructionsZH-HANS': null,
      'strInstructionsZH-HANT': null,
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/vw7iv91493067320.jpg',
      strIngredient1: 'Jägermeister',
      strIngredient2: 'Goldschlager',
      strIngredient3: null,
      strIngredient4: null,
      strIngredient5: null,
      strIngredient6: null,
      strIngredient7: null,
      strIngredient8: null,
      strIngredient9: null,
      strIngredient10: null,
      strIngredient11: null,
      strIngredient12: null,
      strIngredient13: null,
      strIngredient14: null,
      strIngredient15: null,
      strMeasure1: '1 oz ',
      strMeasure2: '1 oz ',
      strMeasure3: null,
      strMeasure4: null,
      strMeasure5: null,
      strMeasure6: null,
      strMeasure7: null,
      strMeasure8: null,
      strMeasure9: null,
      strMeasure10: null,
      strMeasure11: null,
      strMeasure12: null,
      strMeasure13: null,
      strMeasure14: null,
      strMeasure15: null,
      strImageSource: null,
      strImageAttribution: null,
      strCreativeCommonsConfirmed: 'No',
      dateModified: '2017-04-24 21:55:20',
    },
  ],
};

export const GetCategories = {
  drinks: [
    { strCategory: 'Ordinary Drink' }, { strCategory: 'Cocktail' },
    { strCategory: 'Shake' }, { strCategory: 'Other / Unknown' },
    { strCategory: 'Cocoa' }, { strCategory: 'Shot' }, { strCategory: 'Coffee / Tea' },
    { strCategory: 'Homemade Liqueur' }, { strCategory: 'Punch / Party Drink' },
    { strCategory: 'Beer' }, { strCategory: 'Soft Drink' },
  ],
};
const uva = 'suco de uva';
export const ByName = {
  drinks: [
    ById.drinks[0],
    { ...ById.drinks[0], idDrink: '17257', strDrink: 'Mojito' },
    { ...ById.drinks[0], idDrink: '17255', strDrink: 'Cuba Libre' },
    { ...ById.drinks[0], idDrink: '17254', strDrink: 'Aperol Spritz' },
    { ...ById.drinks[0], idDrink: '17253', strDrink: 'Expresso Martini' },
    { ...ById.drinks[0], idDrink: '17252', strDrink: uva, strAlcoholic: 'Non Alcoholic' },
    { ...ById.drinks[0], idDrink: '17251', strDrink: 'Margarita' },
    { ...ById.drinks[0], idDrink: '17250', strDrink: 'Negroni' },
    { ...ById.drinks[0], idDrink: '17249', strDrink: 'Old Fashioned' },
    { ...ById.drinks[0], idDrink: '17248', strDrink: 'Cosmopolitan' },
    { ...ById.drinks[0], idDrink: '17247', strDrink: 'Mai Tai' },
    { ...ById.drinks[0], idDrink: '17246', strDrink: 'Pina Colada' },
    { ...ById.drinks[0], idDrink: '17245', strDrink: 'Caipirinha' },
    { ...ById.drinks[0], idDrink: '17244', strDrink: 'Gin Tonic' },
  ],
};
const thisCategory = { ...ById.drinks[0], strCategory: 'Ordinary Drink' };
export const ByCategory = {
  drinks: [
    thisCategory,
    { ...thisCategory, idDrink: '17256', strDrink: 'MojitoOD' },
    { ...thisCategory, idDrink: '17255', strDrink: 'Cuba LibreOD' },
    { ...thisCategory, idDrink: '17254', strDrink: 'Aperol SpritzOD' },
    { ...thisCategory, idDrink: '17253', strDrink: 'Expresso MartiniOD' },
    { ...thisCategory, idDrink: '17251', strDrink: 'MargaritaOD' },
    { ...thisCategory, idDrink: '17250', strDrink: 'NegroniOD' },
    { ...thisCategory, idDrink: '17249', strDrink: 'Old FashionedOD' },
    { ...thisCategory, idDrink: '17248', strDrink: 'CosmopolitanOD' },
    { ...thisCategory, idDrink: '17247', strDrink: 'Mai TaiOD' },
    { ...thisCategory, idDrink: '17246', strDrink: 'Pina ColadaOD' },
    { ...thisCategory, idDrink: '17245', strDrink: 'CaipirinhaOD' },
    { ...thisCategory, idDrink: '17244', strDrink: 'Gin TonicOD' },
    { ...thisCategory, idDrink: '17243', strDrink: 'Mint JulepOD' },
  ],
};

export const ByFirstLetter = {
  drinks: ByName.drinks.map((drink) => ({ ...drink, strDrink: `F${drink.strDrink}` })),
};

export const ByIngredient = {
  drinks: ByName.drinks.map((drink) => ({
    ...drink, strDrink: `Vodka ${drink.strDrink}`, strIngredient1: 'Vodka',
  })),
};

export const NotFound = {
  drinks: [],
};
