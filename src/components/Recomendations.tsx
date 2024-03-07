import React from 'react';
import RecomendationsList from './RecomendationsList';
import DetailTopic from './DetailTopic';

type RecomendationsProps = {
  recomendations: {
    name: string;
    thumb: string;
  }[];
};

function Recomendations({ recomendations }: RecomendationsProps) {
  return (
    <DetailTopic.Root>
      <DetailTopic.Title>Recommended</DetailTopic.Title>
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
    </DetailTopic.Root>
  );
}

export default Recomendations;
