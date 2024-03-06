export const ById = {
  meals: [
    {
      idMeal: '52771',
      strMeal: 'Spicy Arrabiata Penne',
      strCategory: 'Vegetarian',
      strArea: 'Italian',
      strInstructions: 'Cook the pasta in a pan',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
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
    },
  ],
};

export const GetCategories = {
  meals: [
    { strCategory: 'Beef' }, { strCategory: 'Breakfast' },
    { strCategory: 'Chicken' }, { strCategory: 'Dessert' }, { strCategory: 'Goat' },
    { strCategory: 'Lamb' }, { strCategory: 'Miscellaneous' },
    { strCategory: 'Pasta' }, { strCategory: 'Pork' },
    { strCategory: 'Seafood' }, { strCategory: 'Side' },
    { strCategory: 'Starter' }, { strCategory: 'Vegan' },
    { strCategory: 'Vegetarian' },
  ],
};

export const ByName = {
  meals: [
    ById.meals[0],
    { ...ById.meals[0], idMeal: '52772', strMeal: 'Teriyaki Chicken Casserole' },
    { ...ById.meals[0], idMeal: '52773', strMeal: 'Pasta a La Maluquita' },
    { ...ById.meals[0], idMeal: '52774', strMeal: 'Beef with Garlic' },
    { ...ById.meals[0], idMeal: '52775', strMeal: 'Salad' },
    { ...ById.meals[0], idMeal: '52776', strMeal: 'Sushi' },
    { ...ById.meals[0], idMeal: '52777', strMeal: 'Burguer' },
    { ...ById.meals[0], idMeal: '52778', strMeal: 'Fries' },
    { ...ById.meals[0], idMeal: '52779', strMeal: 'Pizza' },
    { ...ById.meals[0], idMeal: '52780', strMeal: 'Taco' },
    { ...ById.meals[0], idMeal: '52781', strMeal: 'Hot Dog' },
    { ...ById.meals[0], idMeal: '52782', strMeal: 'Burrito' },
  ],
};

const thisCategory = { ...ById.meals[0], strCategory: 'Beef' };
export const ByCategory = {
  meals: [
    thisCategory,
    { ...thisCategory, idMeal: '52772', strMeal: 'Beef 1' },
    { ...thisCategory, idMeal: '52773', strMeal: 'Beef 2' },
    { ...thisCategory, idMeal: '52774', strMeal: 'Beef with Garlic' },
    { ...thisCategory, idMeal: '52775', strMeal: 'Beef a la maluquitos' },
    { ...thisCategory, idMeal: '52776', strMeal: 'Beef Sushi' },
    { ...thisCategory, idMeal: '52777', strMeal: 'Burguer' },
    { ...thisCategory, idMeal: '52778', strMeal: 'Beef with Fries' },
    { ...thisCategory, idMeal: '52779', strMeal: 'Beef Pizza' },
    { ...thisCategory, idMeal: '52780', strMeal: 'Taco' },
    { ...thisCategory, idMeal: '52781', strMeal: 'Hot Dog' },
    { ...thisCategory, idMeal: '52782', strMeal: 'Burrito' },
  ],
};

export const ByFirstLetter = {
  meals: ByName.meals.map((meal) => ({ ...meal, strMeal: `F${meal.strMeal}` })),
};

export const ByIngredient = {
  meals: ByName.meals.map((meal) => ({
    ...meal, strMeal: `Beef ${meal.strMeal}`, strIngredient1: 'Beef',
  })),
};

export const NotFound = {
  meals: [],
};
