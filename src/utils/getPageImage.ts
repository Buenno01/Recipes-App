import mealIcon from '../assets/images/mealIcon.svg';
import drinkIcon from '../assets/images/drinkIcon.svg';
import profileIcon from '../assets/images/profileIcon.svg';
import favoriteIcon from '../assets/images/favoriteIcon.svg';
import doneIcon from '../assets/images/doneIcon.svg';

type PageType = 'Profile' | 'Done Recipes' | 'Favorite Recipes' | 'Meals' | 'Drinks' | '';

const getPageImage = (page: PageType) => {
  switch (page) {
    case 'Profile':
      return profileIcon;
    case 'Done Recipes':
      return doneIcon;
    case 'Favorite Recipes':
      return favoriteIcon;
    case 'Meals':
      return mealIcon;
    case 'Drinks':
      return drinkIcon;
    default:
      return '';
  }
};

export default getPageImage;
