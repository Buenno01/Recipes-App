import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { renderWithRouter } from './utils';
import App from '../App';
import { formatType } from '../utils/formatType';
import FavoriteRecipesContext from '../contexts/FavoriteRecipesContext';
import { FAVORITE_RECIPES_MOCK } from './mocks/favoriteRecipesMock';

const INITIAL_ENTRIES = { initialEntries: ['/favorite-recipes'] };
const INDEX_MOCK = [0, 1];
const MARTINEZ_2_MOCK = 'Martinez 2';
const SPICY_ARRABIATA_PENNE_MOCK = 'Spicy Arrabiata Penne';
describe('Favorite Recipes Page Tests - Loaded Elements', () => {
  beforeEach(() => {
    renderWithRouter(
      <FavoriteRecipesContext.Provider
        value={ { favoriteRecipes: FAVORITE_RECIPES_MOCK,
          setFavoriteRecipes: () => {} } }
      >
        <App />
      </FavoriteRecipesContext.Provider>,
      INITIAL_ENTRIES,
    );
  });

  test('Title loaded.', () => {
    const favoriteRecipesText = screen.getByText(/Favorite Recipes/i);
    expect(favoriteRecipesText).toBeInTheDocument();
  });

  test('Image Element loaded.', () => {
    const imageElement = screen.getByTestId(`${INDEX_MOCK[0]}-horizontal-image`);
    expect(imageElement).toBeInTheDocument();
  });

  test('Category Element loaded.', () => {
    const categoryElement = screen.getByTestId(`${INDEX_MOCK[0]}-horizontal-top-text`);
    expect(categoryElement).toBeInTheDocument();
  });

  test('Share Button Element loaded.', () => {
    const shareButtonElement = screen
      .getByTestId(`${INDEX_MOCK[0]}-horizontal-share-btn`);
    expect(shareButtonElement).toBeInTheDocument();
  });

  test('Drink Element loaded.', () => {
    const isAlcoholic = screen.getByTestId(`${INDEX_MOCK[1]}-horizontal-top-text`);
    expect(isAlcoholic).toBeInTheDocument();
  });
});

describe('localStorage: favoriteRecipes', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  test('Null initial value', () => {
    renderWithRouter(
      <FavoriteRecipesContext.Provider
        value={ { favoriteRecipes: [], setFavoriteRecipes: () => {} } }
      >
        <App />
      </FavoriteRecipesContext.Provider>,
      INITIAL_ENTRIES,
    );
    const emptyElement = screen.queryByTestId(`${INDEX_MOCK[1]}-horizontal-top-text`);
    expect(emptyElement).toBeNull();
  });
  test('Some initial value', () => {
    renderWithRouter(
      <FavoriteRecipesContext.Provider
        value={ { favoriteRecipes: FAVORITE_RECIPES_MOCK,
          setFavoriteRecipes: () => {} } }
      >
        <App />
      </FavoriteRecipesContext.Provider>,
      INITIAL_ENTRIES,
    );
    const textElement = screen.queryByTestId(`${INDEX_MOCK[1]}-horizontal-top-text`);
    expect(textElement).not.toBeNull();
  });

  describe('Response for Filter', () => {
    test('Return the right type for filter', () => {
      expect(formatType('meal')).toBe('meals');
      expect(formatType('meals')).toBe('meals');
      expect(formatType('drink')).toBe('drinks');
      expect(formatType('drinks')).toBe('drinks');
      expect(formatType('food')).toBe('food');
    });

    test('Drink Filter Test', async () => {
      renderWithRouter(
        <FavoriteRecipesContext.Provider
          value={ { favoriteRecipes: FAVORITE_RECIPES_MOCK,
            setFavoriteRecipes: () => {} } }
        >
          <App />
        </FavoriteRecipesContext.Provider>,
        INITIAL_ENTRIES,
      );
      const button = screen.getByTestId('filter-by-drink-btn');
      await userEvent.click(button);
      const drink1 = screen.queryByText(MARTINEZ_2_MOCK);
      const food1 = screen.queryByText(SPICY_ARRABIATA_PENNE_MOCK);
      expect(drink1).toBeInTheDocument();
      expect(food1).toBeNull();
    });

    test('Meal Filter Test', async () => {
      renderWithRouter(
        <FavoriteRecipesContext.Provider
          value={ { favoriteRecipes: FAVORITE_RECIPES_MOCK,
            setFavoriteRecipes: () => {} } }
        >
          <App />
        </FavoriteRecipesContext.Provider>,
        INITIAL_ENTRIES,
      );
      const button = screen.getByTestId('filter-by-meal-btn');

      await userEvent.click(button);
      const drink1 = screen.queryByText(MARTINEZ_2_MOCK);
      const food1 = screen.queryByText(SPICY_ARRABIATA_PENNE_MOCK);

      expect(drink1).toBeNull();
      expect(food1).toBeInTheDocument();
    });

    test('Multiple Filters', async () => {
      renderWithRouter(
        <FavoriteRecipesContext.Provider
          value={ { favoriteRecipes: FAVORITE_RECIPES_MOCK,
            setFavoriteRecipes: () => {} } }
        >
          <App />
        </FavoriteRecipesContext.Provider>,
        INITIAL_ENTRIES,
      );
      const buttonMeal = screen.getByTestId('filter-by-meal-btn');
      const buttonDrink = screen.getByTestId('filter-by-drink-btn');
      const buttonAll = screen.getByTestId('filter-by-all-btn');
      await userEvent.click(buttonMeal);
      let drink1 = screen.queryByText(MARTINEZ_2_MOCK);
      let food1 = screen.queryByText(SPICY_ARRABIATA_PENNE_MOCK);
      expect(drink1).toBeNull();
      expect(food1).toBeInTheDocument();
      const reload = () => {
        drink1 = screen.queryByText(MARTINEZ_2_MOCK);
        food1 = screen.queryByText(SPICY_ARRABIATA_PENNE_MOCK);
      };
      await userEvent.click(buttonDrink);
      reload();
      expect(drink1).toBeInTheDocument();
      expect(food1).toBeNull();
      await userEvent.click(buttonAll);
      reload();
      expect(drink1).toBeInTheDocument();
      expect(food1).toBeInTheDocument();
    });
  });

  describe('Redirect by click on image or Name', () => {
    test('Image Click', async () => {
      renderWithRouter(
        <FavoriteRecipesContext.Provider
          value={ { favoriteRecipes: FAVORITE_RECIPES_MOCK,
            setFavoriteRecipes: () => {} } }
        >
          <App />
        </FavoriteRecipesContext.Provider>,
        INITIAL_ENTRIES,
      );
      const imgBtn = screen.getByTestId(`${INDEX_MOCK[0]}-horizontal-image-btn`);
      await userEvent.click(imgBtn);
      const imgElement = await screen.findByTestId('recipe-photo');
      expect(imgElement).not.toBeNull();
    });
    test('Name Click', async () => {
      renderWithRouter(
        <FavoriteRecipesContext.Provider
          value={ { favoriteRecipes: FAVORITE_RECIPES_MOCK,
            setFavoriteRecipes: () => {} } }
        >
          <App />
        </FavoriteRecipesContext.Provider>,
        INITIAL_ENTRIES,
      );
      const nameBtn = screen.getByTestId(`${INDEX_MOCK[0]}-horizontal-name`);
      await userEvent.click(nameBtn);
      const nameElement = await screen.findByTestId('recipe-photo');
      expect(nameElement).not.toBeNull();
    });
  });
});
