import React from 'react';
import { RecipeOptionsType } from '../@types/RecipeOptionsType';

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
    <div>
      <iframe
        data-testid="video"
        title={ name }
        src={ video }
      />
    </div>
  );
}

export default Video;
