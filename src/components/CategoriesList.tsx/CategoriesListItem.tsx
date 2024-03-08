import React from 'react';
import CategoryBtn from '../atoms/CategoryBtn';

type CategoriesListItemProps = {
  category: string;
  handleClick: () => void;
};

function CategoriesListItem({ category, handleClick }: CategoriesListItemProps) {
  return (
    <li className="flex flex-col max-w-11 min-h-20 text-center gap-1" key={ category }>
      <CategoryBtn
        onClick={ handleClick }
        data-testid={ `${category}-category-filter` }
        category={ category }
      />
      <span className="text-xxs font-light text-gray-500 whitespace-normal">
        {category}
      </span>
    </li>
  );
}

export default CategoriesListItem;
