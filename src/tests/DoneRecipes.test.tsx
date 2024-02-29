import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import DoneRecipes from '../pages/DoneRecipes';
import { doneRecipesMock } from './mock';
import { DoneRecipeContext } from '../contexts/DoneRecipeContext';

describe('Done Recipes Page Tests - Loaded Elements', () => {
  beforeEach(() => {
    render(
      <DoneRecipeContext.Provider value={ { doneRecipes: doneRecipesMock, setDoneRecipesContext: () => {} } }>
        <DoneRecipes />
      </DoneRecipeContext.Provider>,
    );
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
    const tagTeste = doneRecipesMock[index].tags
      ? doneRecipesMock[index].tags[0]
      : '';

    const tagsElement = screen.getByTestId(`${index}-${tagTeste}-horizontal-tag`);
    expect(tagsElement).toBeInTheDocument();
  });
  test(('Drink Element loaded.'), () => {
    const index = 1;
    const isAlcoholic = screen.getByTestId(`${index}-horizontal-top-text`);
    expect(isAlcoholic).toBeInTheDocument();
  });
});

describe(('localStorage: doneRecipes'), () => {
  beforeEach(() => {
    localStorage.clear();
  });
  test(('Null initial value'), () => {
    <DoneRecipeContext.Provider value={ { doneRecipes: null, setDoneRecipesContext: () => {} } }>
      <DoneRecipes />
    </DoneRecipeContext.Provider>;
  });
  const index = 1;
  const nullElement = screen.queryByTestId(`${index}-horizontal-top-text`);
  expect(nullElement).toBeNull();
});

describe(('Copy to clipboard'), () => {
  const indexMock = 0;
  const urlMock = `${window.location.origin}/${doneRecipesMock[indexMock].type}s/${doneRecipesMock[indexMock].id}`;
  const clipboardMock = {
    ...global.navigator.clipboard,
    writeText: vi.fn(),
    readText: vi.fn().mockReturnValue(urlMock),
  };

  beforeEach(() => {
    global.navigator = {
      ...global.navigator,
      clipboard: clipboardMock };

    render(
      <DoneRecipeContext.Provider value={ { doneRecipes: doneRecipesMock, setDoneRecipesContext: () => {} } }>
        <DoneRecipes />
      </DoneRecipeContext.Provider>,
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test(('Copied element'), async () => {
    const doneRecipe = document.getElementById(`${indexMock}-done-recipe-element`);
    const button = doneRecipe?.querySelector('button');
    expect(button).toBeInTheDocument();
    expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(0);
    await waitFor(() => {
      if (button) fireEvent.click(button);
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(urlMock);
      expect(navigator.clipboard.readText()).toBe(urlMock);
    });
  });
});
