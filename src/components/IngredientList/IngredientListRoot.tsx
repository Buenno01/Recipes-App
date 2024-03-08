import React from 'react';
import DetailTopic from '../DetailTopic';

interface IngredientListRootProps extends React.HTMLAttributes<HTMLUListElement> {
  children: React.ReactNode;
}

function IngredientListRoot({ children, ...rest }: IngredientListRootProps) {
  return (
    <DetailTopic.Root>
      <DetailTopic.Title>Ingredients</DetailTopic.Title>
      <DetailTopic.Box>
        <ul { ...rest }>
          { children }
        </ul>
      </DetailTopic.Box>
    </DetailTopic.Root>
  );
}

export default IngredientListRoot;
