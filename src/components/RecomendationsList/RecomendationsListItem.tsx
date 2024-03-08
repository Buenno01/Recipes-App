import React from 'react';

type RecomendationsListItemProps = {
  title: string;
  imgSrc: string;
  index: number;
};

function RecomendationsListItem({ title, imgSrc, index }: RecomendationsListItemProps) {
  return (
    <li
      data-testid={ `${index}-recommendation-card` }
      className="min-w-40 h-40 flex flex-col items-center
      gap-2 overflow-hidden rounded-lg relative border border-gray-300"
    >
      <img src={ imgSrc } alt={ title } />
      <h3
        className="absolute bottom-0 w-full bg-white px-4"
        data-testid={ `${index}-recommendation-title` }
      >
        {title}
      </h3>
    </li>
  );
}

export default RecomendationsListItem;
