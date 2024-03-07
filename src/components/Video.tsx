import React from 'react';
import { RecipeOptionsType } from '../@types/RecipeOptionsType';
import DetailTopic from './DetailTopic';

type VideoProps = {
  recipe: {
    name: string;
    video?: string | null;
    type: RecipeOptionsType;
  }
};

function Video({ recipe: { name, video = null, type } }: VideoProps) {
  if (type !== 'meals' || !video) return '';

  return (
    <DetailTopic.Root>
      <DetailTopic.Title>Video</DetailTopic.Title>
      <div className="w-full h-32">
        <iframe
          className="w-full"
          data-testid="video"
          title={ name }
          src={ video }
        />
      </div>
    </DetailTopic.Root>
  );
}

export default Video;
