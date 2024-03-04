import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import Home from '../pages/Recipes';
import { renderWithRouter } from './utils';
import * as fetchCategories from '../hooks/useFetchCategories';
import * as fetchRecipes from '../services/useFetchDrinkOrFoodByName';
import { mealCategoriesMock, mealFormattedSearchByNameMock } from './mealMocks';

const MEALS_ROUTE = { initialEntries: ['/meals'] };

const DRINKS_ROUTE = { initialEntries: ['/drinks'] };

const fetchCategoriesMock = (loading = false, error = '') => vi.spyOn(fetchCategories, 'default').mockReturnValue({
  categories: mealCategoriesMock,
  loading,
  error,
});

const fetchRecipesMock = (loading = false, error = '') => vi.spyOn(fetchRecipes, 'default').mockReturnValue({
  recipes: mealFormattedSearchByNameMock,
  loading,
  error,
});

const fetchMockBoth = () => {
  fetchCategoriesMock();
  fetchRecipesMock();
};

describe('Home', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should render /meals with 12 meal recipes', async () => {
    const fetchRecipesSpy = fetchRecipesMock();
    fetchCategoriesMock();
    renderWithRouter(<Home />, MEALS_ROUTE);

    expect(fetchRecipesSpy).toHaveBeenCalledTimes(1);
    expect(fetchRecipesSpy).toHaveBeenCalledWith('', 'meals');

    const recipeCards = await screen.findAllByTestId(/-recipe-card/);

    expect(recipeCards.length).toBe(12);
  });

  it('should render /drinks with 12 drink recipes', async () => {
    const fetchRecipesSpy = fetchRecipesMock();
    fetchCategoriesMock();
    renderWithRouter(<Home />, DRINKS_ROUTE);

    expect(fetchRecipesSpy).toHaveBeenCalledTimes(1);
    expect(fetchRecipesSpy).toHaveBeenCalledWith('', 'drinks');

    const recipeCards = await screen.findAllByTestId(/-recipe-card/);

    expect(recipeCards.length).toBe(12);
  });

  it('should render loading message', async () => {
    fetchCategoriesMock();
    fetchRecipesMock(true);
    renderWithRouter(<Home />, MEALS_ROUTE);

    const loadingMessage = await screen.findByText(/Loading/);

    expect(loadingMessage).toBeInTheDocument();
  });

  it('should render error message', async () => {
    fetchCategoriesMock();
    fetchRecipesMock(false, 'Error fetching recipes');
    renderWithRouter(<Home />, MEALS_ROUTE);

    const errorMessage = await screen.findByText(/Error fetching recipes/);

    expect(errorMessage).toBeInTheDocument();
  });

  it('should render only 5 categories', async () => {
    const fetchCategoriesSpy = fetchCategoriesMock();
    fetchRecipesMock();
    renderWithRouter(<Home />, MEALS_ROUTE);

    expect(fetchCategoriesSpy).toHaveBeenCalledTimes(1);
    expect(fetchCategoriesSpy).toHaveBeenCalledWith('meals');

    const categories = await screen.findAllByTestId(/-category-filter/);

    expect(categories.length).toBe(5);
  });
});
