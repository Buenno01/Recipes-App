import React from 'react';
import CategoryBtn from '../atoms/CategoryBtn';

type CategoriesListItemProps = {
  category: string;
  handleClick: () => void;
};

function CategoriesListItem({ category, handleClick }: CategoriesListItemProps) {
  return (
    <li key={ category }>
      <CategoryBtn
        onClick={ handleClick }
        data-testid={ `${category}-category-filter` }
        category={ category }
      />
      {category}
    </li>
  );
}

export default CategoriesListItem;
