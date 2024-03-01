import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import DoneRecipes from '../pages/DoneRecipes';
import { doneRecipesMock } from './mock';
import { DoneRecipesContext } from '../contexts/DoneRecipesContext';

describe('Done Recipes Page Tests - Loaded Elements', () => {
  beforeEach(() => {
    render(
      <DoneRecipesContext.Provider value={ { doneRecipesContext: doneRecipesMock, setDoneRecipesContext: () => {} } }>
        <DoneRecipes />
      </DoneRecipesContext.Provider>,
    );
  });

  test('Title loaded.', () => {
    const doneRecipesText = screen.getByText(/Done Recipes/i);
    expect(doneRecipesText).toBeInTheDocument();
  });

  test('Image Element loaded.', () => {
    const index = 0;
    const imageElement = screen.getByTestId(`${index}-horizontal-image`);
    expect(imageElement).toBeInTheDocument();
  });

  test('Category Element loaded.', () => {
    const index = 0;
    const categoryElement = screen.getByTestId(`${index}-horizontal-top-text`);
    expect(categoryElement).toBeInTheDocument();
  });

  test('Date Element loaded.', () => {
    const index = 0;
    const dateElement = screen.getByTestId(`${index}-horizontal-done-date`);
    expect(dateElement).toBeInTheDocument();
  });

  test('Share Button Element loaded.', () => {
    const index = 0;
    const shareButtonElement = screen.getByTestId(`${index}-horizontal-share-btn`);
    expect(shareButtonElement).toBeInTheDocument();
  });

  test('Tags Element loaded.', () => {
    const index = 0;
    const tagTeste = doneRecipesMock[index].tags
      ? doneRecipesMock[index].tags[0]
      : '';

    const tagsElement = screen.getByTestId(`${index}-${tagTeste}-horizontal-tag`);
    expect(tagsElement).toBeInTheDocument();
  });
  test('Drink Element loaded.', () => {
    const index = 1;
    const isAlcoholic = screen.getByTestId(`${index}-horizontal-top-text`);
    expect(isAlcoholic).toBeInTheDocument();
  });
});

describe('localStorage: doneRecipes', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  test('Null initial value', () => {
    render(
      <DoneRecipesContext.Provider value={ { doneRecipesContext: [], setDoneRecipesContext: () => {} } }>
        <DoneRecipes />
      </DoneRecipesContext.Provider>,
    );
    const index = 1;
    const emptyElement = screen.queryByTestId(`${index}-horizontal-top-text`);
    expect(emptyElement).toBeNull();
  });

  test('Change initial value', () => {
    render(
      <DoneRecipesContext.Provider value={ { doneRecipesContext: [], setDoneRecipesContext: () => {} } }>
        <DoneRecipes />
      </DoneRecipesContext.Provider>,
    );
    const index = 0;
    const emptyElement = screen.queryByTestId(`${index}-horizontal-top-text`);
    expect(emptyElement).toBeNull();

    // teste do set necessita botão de filtro.
    render(
      <DoneRecipesContext.Provider value={ { doneRecipesContext: doneRecipesMock, setDoneRecipesContext: () => {} } }>
        <DoneRecipes />
      </DoneRecipesContext.Provider>,
    );

    const newElement = screen.queryByTestId(`${index}-horizontal-top-text`);
    expect(newElement).not.toBeNull();
  });

  describe('Copy to clipboard', () => {
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
        <DoneRecipesContext.Provider value={ { doneRecipesContext: doneRecipesMock, setDoneRecipesContext: () => {} } }>
          <DoneRecipes />
        </DoneRecipesContext.Provider>,
      );
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    test('Copied element', async () => {
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
});

describe('Teste de filtro por tipo', () => {
  beforeEach(() => {
    render(
      <DoneRecipesContext.Provider value={ { doneRecipesContext: doneRecipesMock, setDoneRecipesContext: () => {} } }>
        <DoneRecipes />
      </DoneRecipesContext.Provider>,
    );
  });
  const MARTINEZ_2 = 'Martinez 2';
  const CHICKEN = 'Chicken';
  test('Teste filtro de Drink', async () => {
    const button = screen.getByTestId('filter-by-drink-btn');
    fireEvent.click(button);
    const drink1 = screen.queryByText(MARTINEZ_2);
    const food1 = screen.queryByText(CHICKEN);
    expect(drink1).toBeInTheDocument();
    expect(food1).toBeNull();
  });

  test('Teste filtro de Meal', async () => {
    const button = screen.getByTestId('filter-by-meal-btn');
    fireEvent.click(button);
    const drink1 = screen.queryByText(MARTINEZ_2);
    const food1 = screen.queryByText(CHICKEN);
    expect(drink1).toBeNull();
    expect(food1).toBeInTheDocument();
  });

  test('Teste de múltiplo filtro', async () => {
    const buttonMeal = screen.getByTestId('filter-by-meal-btn');
    const buttonDrink = screen.getByTestId('filter-by-drink-btn');
    const buttonAll = screen.getByTestId('filter-by-all-btn');
    fireEvent.click(buttonMeal);
    let drink1 = screen.queryByText(MARTINEZ_2);
    let food1 = screen.queryByText(CHICKEN);
    expect(drink1).toBeNull();
    expect(food1).toBeInTheDocument();
    const reload = () => {
      drink1 = screen.queryByText(MARTINEZ_2);
      food1 = screen.queryByText(CHICKEN);
    };
    fireEvent.click(buttonDrink);
    reload();
    expect(drink1).toBeInTheDocument();
    expect(food1).toBeNull();
    fireEvent.click(buttonAll);
    reload();
    expect(drink1).toBeInTheDocument();
    expect(food1).toBeInTheDocument();
  });
});
