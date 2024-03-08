import categoryIcons from '../assets/images/categoryIcons';

const getCategoryIcons = (category: string, pathname: string): string => {
  const recipeType = pathname.includes('meals') ? 'meals' : 'drinks';
  const formattedCategory = category.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-');

  return categoryIcons[formattedCategory as keyof typeof categoryIcons]
  || categoryIcons[recipeType];
};

export default getCategoryIcons;
