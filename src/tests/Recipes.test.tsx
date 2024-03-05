import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import Home from '../pages/Recipes';
import { renderWithRouterAndProviders } from './utils';
import {
  fetchCategoriesMock,
  fetchRecipesWithFilterMock,
} from './mocks/mockFetchs';
import { globalFetchMock } from './mocks/mockGlobalFetch';

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

  it.only('should filter recipes by category', async () => {
    vi.restoreAllMocks();
    const spy = globalFetchMock();

    renderWithRouterAndProviders(<Home />, MEALS_ROUTE);

    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    expect(spy).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');

    await waitForElementToBeRemoved(screen.getByText(/Loading/));

    const allButton = screen.getByTestId('All-category-filter');
    expect(allButton).toBeInTheDocument();
    const beefButton = screen.getByTestId('Beef-category-filter');
    expect(beefButton).toBeInTheDocument();

    screen.debug();
    await userEvent.click(beefButton);
    // expect(spy).toHaveBeenCalledTimes(3);
  });
});
