import React from 'react';
import { render, screen } from '@testing-library/react';
import DoneRecipes from '../pages/DoneRecipes';

test('Farewell, front-end', () => {
  // Este arquivo pode ser modificado ou deletado sem problemas
  render(<DoneRecipes />);
  const doneRecipesText = screen.getByText(/Done Recipes/i);
  expect(doneRecipesText).toBeInTheDocument();
});
