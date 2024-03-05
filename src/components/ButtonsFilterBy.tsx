import React from 'react';

type ButtonsFilterByProps = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

function ButtonsFilterBy({ onClick }: ButtonsFilterByProps) {
  return (
    <div className="space-x-1">
      <button
        id="filter-by-all-btn"
        data-testid="filter-by-all-btn"
        onClick={ onClick }
      >
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
        id="filter-by-meal-btn"
        onClick={ onClick }
      >
        Meals
      </button>
      <button
        id="filter-by-drink-btn"
        data-testid="filter-by-drink-btn"
        onClick={ onClick }
      >
        Drinks
      </button>
    </div>
  );
}

export default ButtonsFilterBy;
