import React from 'react';
import RecomendationsList from './RecomendationsList';

type RecomendationsProps = {
  recomendations: {
    name: string;
    thumb: string;
  }[];
};

function Recomendations({ recomendations }: RecomendationsProps) {
  return (
    <RecomendationsList.Root>
      {
        recomendations.map((rec, index) => (
          <RecomendationsList.Item
            index={ index }
            key={ index + rec.name }
            title={ rec.name }
            imgSrc={ rec.thumb }
          />
        ))
      }
    </RecomendationsList.Root>
  );
}

export default Recomendations;
