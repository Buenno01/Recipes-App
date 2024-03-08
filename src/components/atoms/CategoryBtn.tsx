import React from 'react';
import { useLocation } from 'react-router-dom';
import getCategoryIcons from '../../utils/getCategoryIcon';

interface CategoryBtnProps extends React.HTMLAttributes<HTMLButtonElement> {
  category: string;
}

function CategoryBtn({ category, ...rest }: CategoryBtnProps) {
  const { pathname } = useLocation();
  const src = getCategoryIcons(category, pathname);
  return (
    <button
      { ...rest }
      className="h-11 w-11 rounded-full border-primary-yellow
      border-2 flex items-center justify-center p-1"
    >
      <img
        src={ src }
        alt=""
      />
    </button>
  );
}

export default CategoryBtn;
