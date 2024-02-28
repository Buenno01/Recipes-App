import React from 'react';
import { DoneRecipeProps } from '../@types/DoneRecipeType';


function DoneRecipe(props: DoneRecipeProps) {
  const { doneRecipe, index } = props;
  return (
    <div>
      <img src={ doneRecipe.image } data-testid={ `${index}-horizontal-image` } alt={ doneRecipe.name } />
      <p data-testid={ `${index}-horizontal-top-text` }>{doneRecipe.category}</p>
      <p data-testid={ `${index}-horizontal-name` }>{doneRecipe.category}</p>
      <p data-testid={ `${index}-horizontal-done-date` }>{doneRecipe.doneDate}</p>
      <button
        id="share-done-recipe-button"
        data-testid={ `${index}-horizontal-share-btn` }
      >
        Compartilhar
      </button>
      <p>Tags:</p>
      {
      doneRecipe.tags.map((tagName: string)=>{
        return(
        <p key={tagName} data-testid={`${index}-${tagName}-horizontal-tag`}>
          {tagName}
        </p>
        );
      })}
    </div>
  );
}

export default DoneRecipe;
