import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DONE_RECIPES_MOCK } from './doneRecipesMock';
import { DoneRecipesContext } from '../contexts/DoneRecipesContext';
import { renderWithRouter } from './utils';
import App from '../App';
import { formatType } from '../utils/formatType';

const INITIAL_ENTRIES = { initialEntries: ['/done-recipes'] };
const INDEX_MOCK = [0, 1];
describe('Done Recipes Page Tests - Loaded Elements', () => {
  beforeEach(() => {
    renderWithRouter(
      <DoneRecipesContext.Provider value={ { doneRecipesContext: DONE_RECIPES_MOCK, setDoneRecipesContext: () => {} } }>
        <App />
      </DoneRecipesContext.Provider>,
      INITIAL_ENTRIES,
    );
  });

  test('Title loaded.', () => {
    const doneRecipesText = screen.getByText(/Done Recipes/i);
    expect(doneRecipesText).toBeInTheDocument();
  });

  test('Image Element loaded.', () => {
    const imageElement = screen.getByTestId(`${INDEX_MOCK[0]}-horizontal-image`);
    expect(imageElement).toBeInTheDocument();
  });

  test('Category Element loaded.', () => {
    const categoryElement = screen.getByTestId(`${INDEX_MOCK[0]}-horizontal-top-text`);
    expect(categoryElement).toBeInTheDocument();
  });

  test('Date Element loaded.', () => {
    const dateElement = screen.getByTestId(`${INDEX_MOCK[0]}-horizontal-done-date`);
    expect(dateElement).toBeInTheDocument();
  });

  test('Share Button Element loaded.', () => {
    const shareButtonElement = screen.getByTestId(`${INDEX_MOCK[0]}-horizontal-share-btn`);
    expect(shareButtonElement).toBeInTheDocument();
  });

  test('Tags Element loaded.', () => {
    const tagTeste = DONE_RECIPES_MOCK[INDEX_MOCK[0]].tags
      ? DONE_RECIPES_MOCK[INDEX_MOCK[0]].tags[0]
      : '';

    const tagsElement = screen.getByTestId(`${INDEX_MOCK[0]}-${tagTeste}-horizontal-tag`);
    expect(tagsElement).toBeInTheDocument();
  });
  test('Drink Element loaded.', () => {
    const isAlcoholic = screen.getByTestId(`${INDEX_MOCK[1]}-horizontal-top-text`);
    expect(isAlcoholic).toBeInTheDocument();
  });
});

describe('localStorage: doneRecipes', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  test('Null initial value', () => {
    renderWithRouter(
      <DoneRecipesContext.Provider value={ { doneRecipesContext: [], setDoneRecipesContext: () => {} } }>
        <App />
      </DoneRecipesContext.Provider>,
      INITIAL_ENTRIES,
    );
    const emptyElement = screen.queryByTestId(`${INDEX_MOCK[1]}-horizontal-top-text`);
    expect(emptyElement).toBeNull();
  });
  test('Some initial value', () => {
    renderWithRouter(
      <DoneRecipesContext.Provider value={ { doneRecipesContext: DONE_RECIPES_MOCK, setDoneRecipesContext: () => {} } }>
        <App />
      </DoneRecipesContext.Provider>,
      INITIAL_ENTRIES,
    );
    const textElement = screen.queryByTestId(`${INDEX_MOCK[1]}-horizontal-top-text`);
    expect(textElement).not.toBeNull();
  });

  describe('Response for Filter', () => {
    const MARTINEZ_2 = 'Martinez 2';
    const CHICKEN = 'Chicken';

    test('Return the right type for filter', () => {
      expect(formatType('meal')).toBe('meals');
      expect(formatType('meals')).toBe('meals');
      expect(formatType('drink')).toBe('drinks');
      expect(formatType('drinks')).toBe('drinks');
      expect(formatType('food')).toBe('food');
    });

    test('Drink Filter Test', async () => {
      renderWithRouter(
        <DoneRecipesContext.Provider value={ { doneRecipesContext: DONE_RECIPES_MOCK, setDoneRecipesContext: () => {} } }>
          <App />
        </DoneRecipesContext.Provider>,
        INITIAL_ENTRIES,
      );
      const button = screen.getByTestId('filter-by-drink-btn');
      await userEvent.click(button);
      const drink1 = screen.queryByText(MARTINEZ_2);
      const food1 = screen.queryByText(CHICKEN);
      expect(drink1).toBeInTheDocument();
      expect(food1).toBeNull();
    });

    test('Meal Filter Test', async () => {
      renderWithRouter(
        <DoneRecipesContext.Provider value={ { doneRecipesContext: DONE_RECIPES_MOCK, setDoneRecipesContext: () => {} } }>
          <App />
        </DoneRecipesContext.Provider>,
        INITIAL_ENTRIES,
      );
      const button = screen.getByTestId('filter-by-meal-btn');
      await userEvent.click(button);
      const drink1 = screen.queryByText(MARTINEZ_2);
      const food1 = screen.queryByText(CHICKEN);
      expect(drink1).toBeNull();
      expect(food1).toBeInTheDocument();
    });

    test('Multiple Filters', async () => {
      renderWithRouter(
        <DoneRecipesContext.Provider value={ { doneRecipesContext: DONE_RECIPES_MOCK, setDoneRecipesContext: () => {} } }>
          <App />
        </DoneRecipesContext.Provider>,
        INITIAL_ENTRIES,
      );
      const buttonMeal = screen.getByTestId('filter-by-meal-btn');
      const buttonDrink = screen.getByTestId('filter-by-drink-btn');
      const buttonAll = screen.getByTestId('filter-by-all-btn');
      await userEvent.click(buttonMeal);
      let drink1 = screen.queryByText(MARTINEZ_2);
      let food1 = screen.queryByText(CHICKEN);
      expect(drink1).toBeNull();
      expect(food1).toBeInTheDocument();
      const reload = () => {
        drink1 = screen.queryByText(MARTINEZ_2);
        food1 = screen.queryByText(CHICKEN);
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
        <DoneRecipesContext.Provider value={ { doneRecipesContext: DONE_RECIPES_MOCK, setDoneRecipesContext: () => {} } }>
          <App />
        </DoneRecipesContext.Provider>,
        INITIAL_ENTRIES,
      );
      const imgBtn = screen.getByTestId(`${INDEX_MOCK[0]}-horizontal-image-btn`);
      await userEvent.click(imgBtn);
      const imgElement = await screen.findByTestId('recipe-photo');
      expect(imgElement).not.toBeNull();
    });
    test('Name Click', async () => {
      renderWithRouter(
        <DoneRecipesContext.Provider value={ { doneRecipesContext: DONE_RECIPES_MOCK, setDoneRecipesContext: () => {} } }>
          <App />
        </DoneRecipesContext.Provider>,
        INITIAL_ENTRIES,
      );
      const nameBtn = screen.getByTestId(`${INDEX_MOCK[0]}-horizontal-name`);
      await userEvent.click(nameBtn);
      const nameElement = await screen.findByTestId('recipe-photo');
      expect(nameElement).not.toBeNull();
    });
  });
});
