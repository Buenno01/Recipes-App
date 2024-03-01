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
      className="min-w-48"
    >
      <img src={ imgSrc } alt={ title } />
      <h3 data-testid={ `${index}-recommendation-title` }>
        {title}
      </h3>
    </li>
  );
}

export default RecomendationsListItem;
