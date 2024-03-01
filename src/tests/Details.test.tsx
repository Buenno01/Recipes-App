import { screen } from '@testing-library/dom';
import { vi } from 'vitest';
import { renderWithRouter } from './utils';
import { formattedMealMock, mealFormattedSearchByNameMock } from './mock';
import Details from '../pages/RecipeDetails';
import * as fetchById from '../services/useFetchDrinkOrFoodById';
import * as fetchByName from '../services/useFetchDrinkOrFoodByName';
import { AnyRecipeType } from '../@types/AnyRecipeType';

type ReturnUseFetchDrinkOrFoodByIdType = {
  recipe: AnyRecipeType | undefined;
  loading: boolean;
  error: string;
};

type UseFetchDrinkOrFoodByNameReturnType = {
  recipes: AnyRecipeType[];
  loading: boolean;
  error: string;
};

type FetchReturnsType = ReturnUseFetchDrinkOrFoodByIdType | UseFetchDrinkOrFoodByNameReturnType;

const MOCK_FETCH_BY_ID_RETURN = {
  recipe: formattedMealMock,
  loading: false,
  error: '',
};

const MOCK_FETCH_BY_NAME_RETURN = {
  recipes: mealFormattedSearchByNameMock,
  loading: false,
  error: '',
};

const INITIAL_ENTRIES = { initialEntries: ['/meals/52771'] };

const mockFetchs = (module: any, response: FetchReturnsType, method = 'default') => vi.spyOn(module, method).mockReturnValue(response);

describe('RecipeDetails', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should render the details page', async () => {
    const mockMainFetchSpy = mockFetchs(fetchById, MOCK_FETCH_BY_ID_RETURN);
    const mockFetchByNameSpy = mockFetchs(fetchByName, MOCK_FETCH_BY_NAME_RETURN);
    renderWithRouter(<Details />, INITIAL_ENTRIES);
    expect(window.location.pathname).toBe('/meals/52771');

    expect(mockMainFetchSpy).toHaveBeenCalledTimes(1);
    expect(mockFetchByNameSpy).toHaveBeenCalledTimes(1);
    expect(mockFetchByNameSpy).toHaveBeenCalledWith('', 'drinks');
  });

  it('should render the meal correctly', async () => {
    mockFetchs(fetchById, MOCK_FETCH_BY_ID_RETURN);
    mockFetchs(fetchByName, MOCK_FETCH_BY_NAME_RETURN);
    renderWithRouter(<Details />, INITIAL_ENTRIES);

    const everything = [
      await screen.findByTestId('recipe-photo'),
      await screen.findByTestId('recipe-title'),
      await screen.findByTestId('recipe-category'),
      await screen.findByTestId('instructions'),
      await screen.findByTestId('video'),
    ];

    const [image, title, category, instructions, video] = everything;

    everything.forEach((element) => expect(element).toBeInTheDocument());

    expect(image).toHaveAttribute('src', formattedMealMock.thumb);
    expect(title).toHaveTextContent(formattedMealMock.name);
    expect(category).toHaveTextContent(formattedMealMock.category);
    expect(instructions).toHaveTextContent(formattedMealMock.instructions);
    expect(video).toHaveAttribute('src', formattedMealMock.video);
  });
});
