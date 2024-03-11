const getPageTitle = (pathname: string) => {
  const PROFILE = /profile/i;
  const DONE_RECIPES = /done-recipes/i;
  const FAVORITE_RECIPES = /favorite-recipes/i;
  const MEALS = /^\/meals\/?$/;
  const DRINKS = /^\/drinks\/?$/;

  switch (true) {
    case PROFILE.test(pathname):
      return 'Profile';
    case DONE_RECIPES.test(pathname):
      return 'Done Recipes';
    case FAVORITE_RECIPES.test(pathname):
      return 'Favorite Recipes';
    case MEALS.test(pathname):
      return 'Meals';
    case DRINKS.test(pathname):
      return 'Drinks';
    default:
      return '';
  }
};

export default getPageTitle;
