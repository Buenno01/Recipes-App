import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import Home from '../pages/Recipes';
import { renderWithRouterAndProviders } from './utils';
import {
  fetchCategoriesMock,
  fetchRecipesWithFilterMock,
} from './mocks/mockFetchs';
import { globalFetchMock } from './mocks/mockGlobalFetch';

const BY_NAME_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const BY_CATEGORY_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
const GET_CATEGORIES_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';

const FILTERED_BY_CATEGORY_NAMES = [
  'Spicy Arrabiata Penne',
  'Beef 1',
  'Beef 2',
  'Beef with Garlic',
  'Beef a la maluquitos',
  'Beef Sushi',
  'Burguer',
  'Beef with Fries',
  'Beef Pizza',
  'Taco',
  'Hot Dog',
  'Burrito',
];

const UNFILTERED_NAMES = [
  'Spicy Arrabiata Penne',
  'Teriyaki Chicken Casserole',
  'Pasta a La Maluquita',
  'Beef with Garlic',
  'Salad',
  'Sushi',
  'Burguer',
  'Fries',
  'Pizza',
  'Taco',
  'Hot Dog',
  'Burrito',
];

const MEALS_ROUTE = { initialEntries: ['/meals'] };

const DRINKS_ROUTE = { initialEntries: ['/drinks'] };

const MEALS = 'meals';

const DRINKS = 'drinks';

describe('Home', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should render /meals with 12 meal recipes', async () => {
    const fetchSpy = fetchRecipesWithFilterMock();
    fetchCategoriesMock();
    renderWithRouterAndProviders(<Home />, MEALS_ROUTE);

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledWith(MEALS);

    const recipeCards = await screen.findAllByTestId(/-recipe-card/);

    expect(recipeCards.length).toBe(12);
  });

  it('should render /drinks with 12 drink recipes', async () => {
    const fetchSpy = fetchRecipesWithFilterMock();
    fetchCategoriesMock();
    renderWithRouterAndProviders(<Home />, DRINKS_ROUTE);

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledWith(DRINKS);

    const recipeCards = await screen.findAllByTestId(/-recipe-card/);

    expect(recipeCards.length).toBe(12);
  });

  it('should render loading message', async () => {
    fetchCategoriesMock();
    fetchRecipesWithFilterMock('meals', true);
    renderWithRouterAndProviders(<Home />, MEALS_ROUTE);

    const loadingMessage = await screen.findByText(/Loading/);

    expect(loadingMessage).toBeInTheDocument();
  });

  it('should render error message', async () => {
    fetchCategoriesMock();
    fetchRecipesWithFilterMock('meals', false, 'Error fetching recipes');
    renderWithRouterAndProviders(<Home />, MEALS_ROUTE);

    const errorMessage = await screen.findByText(/Error fetching recipes/);

    expect(errorMessage).toBeInTheDocument();
  });

  it('should render only 5 categories', async () => {
    const fetchCategoriesSpy = fetchCategoriesMock();
    fetchRecipesWithFilterMock();
    renderWithRouterAndProviders(<Home />, MEALS_ROUTE);

    expect(fetchCategoriesSpy).toHaveBeenCalledTimes(1);
    expect(fetchCategoriesSpy).toHaveBeenCalledWith('meals');

    const categories = await screen.findAllByTestId(/-category-filter/);

    expect(categories.length).toBe(6);
  });

  it('should filter recipes by category', async () => {
    vi.restoreAllMocks();
    const spy = globalFetchMock();

    renderWithRouterAndProviders(<Home />, MEALS_ROUTE);

    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith(BY_NAME_ENDPOINT);
    expect(spy).toHaveBeenCalledWith(BY_NAME_ENDPOINT);

    await waitForElementToBeRemoved(screen.getByText(/Loading/));

    UNFILTERED_NAMES.forEach((recipe, index) => {
      expect(screen.getByTestId(`${index}-card-name`)).toHaveTextContent(recipe);
    });

    const allButton = screen.getByTestId('All-category-filter');
    expect(allButton).toBeInTheDocument();
    const beefButton = screen.getByTestId('Beef-category-filter');
    expect(beefButton).toBeInTheDocument();

    await userEvent.click(beefButton);
    expect(spy).toHaveBeenCalledTimes(3);
    expect(spy).toHaveBeenCalledWith(`${BY_CATEGORY_ENDPOINT}Beef`);

    const recipeCards = await screen.findAllByTestId(/-recipe-card/);

    expect(recipeCards.length).toBe(12);

    FILTERED_BY_CATEGORY_NAMES.forEach((recipe, index) => {
      expect(recipeCards[index]).toHaveTextContent(recipe);
    });
  });

  it('should remove filter when clicking on the same category', async () => {
    vi.restoreAllMocks();
    const spy = globalFetchMock();

    renderWithRouterAndProviders(<Home />, MEALS_ROUTE);

    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith(BY_NAME_ENDPOINT);
    expect(spy).toHaveBeenCalledWith(GET_CATEGORIES_ENDPOINT);

    await waitForElementToBeRemoved(screen.getByText(/Loading/));

    const beefButton = screen.getByTestId('Beef-category-filter');
    expect(beefButton).toBeInTheDocument();

    await userEvent.click(beefButton);
    await waitFor(() => {
      expect(spy).toHaveBeenCalledTimes(3);
      expect(spy).toHaveBeenLastCalledWith(`${BY_CATEGORY_ENDPOINT}Beef`);
    });

    await userEvent.click(beefButton);
    waitFor(() => {
      expect(spy).toHaveBeenCalledTimes(4);
      expect(spy).toHaveBeenLastCalledWith(BY_NAME_ENDPOINT);
    });
  });
});
