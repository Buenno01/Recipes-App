import { screen, waitFor } from '@testing-library/dom';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import RecipeInProgress from '../pages/RecipeInProgress';
import { renderWithRouterAndProviders } from './utils';
import mockGlobalFetch from './mocks/mockGlobalFetch';
import mockLocalStorage from './mocks/mockLocalStorage';
import App from '../App';

const finishRecipeBtnTestId = 'finish-recipe-btn';

const getAllElements = async () => [
  await screen.findByTestId('recipe-category'),
  await screen.findByTestId('recipe-title'),
  await screen.findByTestId('recipe-photo'),
  await screen.findByTestId('instructions'),
  await screen.findByTestId('share-btn'),
  await screen.findByTestId('favorite-btn'),
  await screen.findByTestId(finishRecipeBtnTestId),
];
const getVideoElement = async () => screen.findByTestId('video');

const MEAL_RECIPE_ROUTE = { initialEntries: ['/meals/52771/in-progress'] };
const DRINK_RECIPE_ROUTE = { initialEntries: ['/drinks/17256/in-progress'] };

const SERCH_MEAL_BY_ID = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
const SERCH_DRINK_BY_ID = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

describe('RecipeInProgress', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });
  describe('should render correctly', () => {
    it('for meals', async () => {
      const spy = mockGlobalFetch();
      renderWithRouterAndProviders(<RecipeInProgress />, MEAL_RECIPE_ROUTE);

      await waitFor(() => {
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(SERCH_MEAL_BY_ID);
      });

      const everything = [...(await getAllElements()), await getVideoElement()];
      everything.forEach((element) => expect(element).toBeInTheDocument());

      const [category] = everything;
      expect(category).toHaveTextContent('Vegetarian');
    });
    it('for drinks', async () => {
      const spy = mockGlobalFetch();
      renderWithRouterAndProviders(<RecipeInProgress />, DRINK_RECIPE_ROUTE);

      await waitFor(() => {
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(SERCH_DRINK_BY_ID);
      });

      const everything = await getAllElements();
      everything.forEach((element) => expect(element).toBeInTheDocument());

      const [category] = everything;
      expect(category).toHaveTextContent('Alcoholic');
    });
  });

  it('should render the correct ingredients and measurements with checkbox', async () => {
    const spy = mockGlobalFetch();
    renderWithRouterAndProviders(<RecipeInProgress />, DRINK_RECIPE_ROUTE);

    await waitFor(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(SERCH_DRINK_BY_ID);
    });

    const ingredients = await screen.findAllByTestId(/\d+-ingredient-step/);
    expect(ingredients).toHaveLength(2);

    const [ingredient1, ingredient2] = ingredients;
    expect(ingredient1).toHaveTextContent('1 oz - Jägermeister');
    expect(ingredient2).toHaveTextContent('1 oz - Goldschlager');

    expect(ingredient1.children[0]).toHaveAttribute('type', 'checkbox');
    expect(ingredient2.children[0]).toHaveAttribute('type', 'checkbox');
  });

  it('should crossed out the ingredient\'s text when the checkbox is checked', async () => {
    const spy = mockGlobalFetch();
    renderWithRouterAndProviders(<RecipeInProgress />, DRINK_RECIPE_ROUTE);

    await waitFor(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(SERCH_DRINK_BY_ID);
    });

    const ingredients = await screen.findAllByTestId(/\d+-ingredient-step/);
    const [ingredient1, ingredient2] = ingredients;
    const attributeClass = 'class';
    const cssClass = 'flex gap-2 line-through';
    await userEvent.click(ingredient1.children[0]);
    screen.debug();
    await waitFor(() => {
      expect(ingredient1).toHaveAttribute(attributeClass, cssClass);
      expect(ingredient2).not.toHaveAttribute(attributeClass, cssClass);
    });

    await userEvent.click(ingredient2.children[0]);
    await waitFor(() => {
      expect(ingredient1).toHaveAttribute(attributeClass, cssClass);
      expect(ingredient1).toHaveAttribute(attributeClass, cssClass);
    });

    await userEvent.click(ingredient1.children[0]);
    await waitFor(() => {
      expect(ingredient1).not.toHaveAttribute(attributeClass, cssClass);
      expect(ingredient2).toHaveAttribute(attributeClass, cssClass);
    });
  });

  it('should save the progress of a recipe properly', async () => {
    mockGlobalFetch();
    mockLocalStorage.inProgressRecipes();
    const storageSpy = vi.spyOn(Storage.prototype, 'setItem');
    renderWithRouterAndProviders(<App />, DRINK_RECIPE_ROUTE);

    const ingredients = await screen.findAllByTestId(/\d+-ingredient-step/);
    const [ingredient1, ingredient2] = ingredients;

    await userEvent.click(ingredient2);

    expect(storageSpy).toHaveBeenLastCalledWith('inProgressRecipes', JSON.stringify({
      drinks: { 17256: ['Goldschlager'] },
    }));

    await userEvent.click(ingredient1);

    expect(storageSpy).toHaveBeenLastCalledWith('inProgressRecipes', JSON.stringify({
      drinks: { 17256: ['Jägermeister'] },
    }));
  });

  it('should disable the finish button until all ingredients are checked', async () => {
    mockGlobalFetch();
    mockLocalStorage.inProgressRecipes();
    renderWithRouterAndProviders(<RecipeInProgress />, DRINK_RECIPE_ROUTE);

    const finishButton = screen.getByTestId(finishRecipeBtnTestId);
    expect(finishButton).toBeDisabled();

    const ingredients = await screen.findAllByTestId(/\d+-ingredient-step/);
    const [ingredient1, ingredient2] = ingredients;

    await userEvent.click(ingredient1);
    await waitFor(() => {
      expect(finishButton).toBeDisabled();
    });

    await userEvent.click(ingredient2);
    await waitFor(() => {
      expect(finishButton).not.toBeDisabled();
    });
  });

  it('should redirect to the correct page when the finish button is clicked', async () => {
    mockGlobalFetch();
    mockLocalStorage.inProgressRecipes();
    renderWithRouterAndProviders(<RecipeInProgress />, DRINK_RECIPE_ROUTE);

    const ingredients = await screen.findAllByTestId(/\d+-ingredient-step/);

    ingredients.forEach(async (ingredient) => {
      await userEvent.click(ingredient);
    });

    await userEvent.click(screen.getByTestId(finishRecipeBtnTestId));

    await waitFor(() => {
      expect(screen.getByText(/done recipes/i)).toBeInTheDocument();
    });
  });
});
