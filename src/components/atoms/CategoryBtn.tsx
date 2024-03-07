import React from 'react';

interface CategoryBtnProps extends React.HTMLAttributes<HTMLButtonElement> {
  category: string;
}

function CategoryBtn({ category, ...rest }: CategoryBtnProps) {
  const formattedCategory = category.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-');
  return (
    <button
      { ...rest }
      data-testid={ `${category}-category-filter` }
    >
      <img src={ `src/assets/images/category-${formattedCategory}-icon.svg` } alt="" />
      <span>
        {category}
      </span>
    </button>
  );
}

export default CategoryBtn;
