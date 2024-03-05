import React from 'react';

type CategoriesListItemProps = {
  category: string;
  handleClick: () => void;
};

function CategoriesListItem({ category, handleClick }: CategoriesListItemProps) {
  return (
    <li key={ category }>
      <button
        data-testid={ `${category}-category-filter` }
        onClick={ handleClick }
      >
        {category}
      </button>
    </li>
  );
}

export default CategoriesListItem;
