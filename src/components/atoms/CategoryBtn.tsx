import React from 'react';
import { useLocation } from 'react-router-dom';

interface CategoryBtnProps extends React.HTMLAttributes<HTMLButtonElement> {
  category: string;
}

function CategoryBtn({ category, ...rest }: CategoryBtnProps) {
  const formattedCategory = category.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-');
  const { pathname } = useLocation();
  const recipeType = pathname.includes('meals') ? 'meals' : 'drinks';
  const imageAddress = formattedCategory !== 'all' ? formattedCategory : recipeType;
  return (
    <button
      { ...rest }
      data-testid={ `${category}-category-filter` }
      className="h-11 w-11 rounded-full border-primary-yellow
      border-2 flex items-center justify-center p-1"
    >
      <img
        src={ `src/assets/images/category-${imageAddress}-icon.svg` }
        alt=""
      />
    </button>
  );
}

export default CategoryBtn;
