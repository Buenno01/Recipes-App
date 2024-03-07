import React from 'react';
import DetailTopic from '../DetailTopic';

type IngredientListRootProps = {
  children: React.ReactNode;
};

function IngredientListRoot({ children }: IngredientListRootProps) {
  return (
    <DetailTopic.Root>
      <DetailTopic.Title>Ingredients</DetailTopic.Title>
      <DetailTopic.Box>
        <ul>
          { children }
        </ul>
      </DetailTopic.Box>
    </DetailTopic.Root>
  );
}

export default IngredientListRoot;
