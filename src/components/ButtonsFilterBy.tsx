import React from 'react';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';

type ButtonsFilterByProps = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

function ButtonsFilterBy({ onClick }: ButtonsFilterByProps) {
  const circle = `flex items-center justify-center w-24 h-24 
  rounded-full border-2 border-yellow-300 hover:bg-gray-100 mb-2`;
  const icon = 'w-10 h-10';
  return (
    <div className="flex justify-around mb-8">
      <button
        id="filter-by-all-btn"
        data-testid="filter-by-all-btn"
        onClick={ onClick }
      >
        <div
          className={ circle }
        >
          <img
            src={ mealIcon }
            alt="Meals Icon"
            className={ icon }
          />
          <img
            src={ drinkIcon }
            alt="Drinks Icon"
            className={ icon }
          />
        </div>
        <span>
          All
        </span>
      </button>
      <button
        data-testid="filter-by-meal-btn"
        id="filter-by-meal-btn"
        onClick={ onClick }
      >
        <div
          className={ circle }
        >
          <img
            src={ mealIcon }
            alt="Meals Icon"
            className={ icon }
          />
        </div>

        Meals
      </button>
      <button
        id="filter-by-drink-btn"
        data-testid="filter-by-drink-btn"
        onClick={ onClick }
      >
        <div
          className={ circle }
        >
          <img
            src={ drinkIcon }
            alt="Drinks Icon"
            className={ icon }
          />
        </div>
        Drinks
      </button>
    </div>
  );
}

export default ButtonsFilterBy;
