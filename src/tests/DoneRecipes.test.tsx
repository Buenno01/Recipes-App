import React from 'react';
import { render, screen } from '@testing-library/react';
import DoneRecipes from '../pages/DoneRecipes';
import { DONE_RECIPES_MOCK } from './mock';

describe('Done Recipes Page Tests - Loaded Elements', () => {
  // Este arquivo pode ser modificado ou deletado sem problemas
  beforeEach(() => {
    render(<DoneRecipes />);
  });

  test(('Title loaded.'), () => {
    const doneRecipesText = screen.getByText(/Done Recipes/i);
    expect(doneRecipesText).toBeInTheDocument();
  });

  test(('Image Element loaded.'), () => {
    const index = 0;
    const imageElement = screen.getByTestId(`${index}-horizontal-image`);
    expect(imageElement).toBeInTheDocument();
  });

  test(('Category Element loaded.'), () => {
    const index = 0;
    const categoryElement = screen.getByTestId(`${index}-horizontal-top-text`);
    expect(categoryElement).toBeInTheDocument();
  });

  test(('Date Element loaded.'), () => {
    const index = 0;
    const dateElement = screen.getByTestId(`${index}-horizontal-done-date`);
    expect(dateElement).toBeInTheDocument();
  });

  test(('Share Button Element loaded.'), () => {
    const index = 0;
    const shareButtonElement = screen.getByTestId(`${index}-horizontal-share-btn`);
    expect(shareButtonElement).toBeInTheDocument();
  });

  test(('Tags Element loaded.'), () => {
    const index = 0;
    const tagsElement = screen.getByTestId(`${index}-${DONE_RECIPES_MOCK[index].tags[0]}-horizontal-tag`);
    expect(tagsElement).toBeInTheDocument();
  });
});
