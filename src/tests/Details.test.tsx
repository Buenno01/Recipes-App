import { screen } from '@testing-library/dom';
import { vi } from 'vitest';
import { renderWithRouter } from './utils';
import { formattedMealMock, mealFormattedSearchByNameMock } from './mealMocks';
import Details from '../pages/RecipeDetails';
import * as fetchById from '../services/useFetchDrinkOrFoodById';
import * as fetchByName from '../services/useFetchDrinkOrFoodByName';
import { AnyRecipeType } from '../@types/AnyRecipeType';
import { formattedDrinkMock, formattedDrinkSearchByNameMock } from './drinkMocks';

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

type RecommendationsReturnType = {
  cards: HTMLElement[];
  titles: HTMLElement[];
};

const MOCK_FETCH_BY_ID_RETURN_MEAL = {
  recipe: formattedMealMock,
  loading: false,
  error: '',
};

const MOCK_FETCH_BY_NAME_RETURN_MEALS = {
  recipes: mealFormattedSearchByNameMock,
  loading: false,
  error: '',
};

const MOCK_FETCH_BY_ID_RETURN_DRINK = {
  recipe: formattedDrinkMock,
  loading: false,
  error: '',
};

const MOCK_FETCH_BY_NAME_RETURN_DRINKS = {
  recipes: formattedDrinkSearchByNameMock,
  loading: false,
  error: '',
};

const INITIAL_ENTRIES = { initialEntries: ['/meals/52771'] };

const mockFetchs = (module: any, response: FetchReturnsType, method = 'default') => vi.spyOn(module, method).mockReturnValue(response);

const getTheDetailedRecipeInfos = async () => [
  await screen.findByTestId('recipe-photo'),
  await screen.findByTestId('recipe-title'),
  await screen.findByTestId('recipe-category'),
  await screen.findByTestId('instructions'),
  await screen.findByTestId('video'),
];

const getRecomendations = async (): Promise<RecommendationsReturnType> => ({
  cards: await screen.findAllByTestId(/recommendation-card/i),
  titles: await screen.findAllByTestId(/recommendation-title/i),
});

describe('RecipeDetails', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should render the details page', async () => {
    const mockMainFetchSpy = mockFetchs(fetchById, MOCK_FETCH_BY_ID_RETURN_MEAL);
    const mockFetchByNameSpy = mockFetchs(fetchByName, MOCK_FETCH_BY_NAME_RETURN_DRINKS);
    renderWithRouter(<Details />, INITIAL_ENTRIES);
    expect(window.location.pathname).toBe('/meals/52771');

    expect(mockMainFetchSpy).toHaveBeenCalledTimes(1);
    expect(mockFetchByNameSpy).toHaveBeenCalledTimes(1);
  });

  it('should render the meal correctly', async () => {
    mockFetchs(fetchById, MOCK_FETCH_BY_ID_RETURN_MEAL);
    mockFetchs(fetchByName, MOCK_FETCH_BY_NAME_RETURN_DRINKS);
    renderWithRouter(<Details />, INITIAL_ENTRIES);

    const everything = await getTheDetailedRecipeInfos();

    const [image, title, category, instructions, video] = everything;

    everything.forEach((element) => expect(element).toBeInTheDocument());

    expect(image).toHaveAttribute('src', formattedMealMock.thumb);
    expect(title).toHaveTextContent(formattedMealMock.name);
    expect(category).toHaveTextContent(formattedMealMock.category);
    expect(instructions).toHaveTextContent(formattedMealMock.instructions);
    expect(video).toHaveAttribute('src', formattedMealMock.video);
  });

  describe('should fetch the recommendations corretly', () => {
    it('should fetch the drinks recommendations for meals', async () => {
      const mockMainFetchSpy = mockFetchs(fetchById, MOCK_FETCH_BY_ID_RETURN_MEAL);
      const mockFetchByNameSpy = mockFetchs(fetchByName, MOCK_FETCH_BY_NAME_RETURN_DRINKS);

      renderWithRouter(<Details />, INITIAL_ENTRIES);

      expect(mockMainFetchSpy).toHaveBeenCalledTimes(1);
      expect(mockMainFetchSpy).toHaveBeenCalledWith('', 'meals');
      expect(mockFetchByNameSpy).toHaveBeenCalledTimes(1);
      expect(mockFetchByNameSpy).toHaveBeenCalledWith('', 'drinks');

      const { cards, titles } = await getRecomendations();

      expect(cards).toHaveLength(6);

      titles.forEach((title, index) => {
        expect(title).toHaveTextContent(formattedDrinkSearchByNameMock[index].name);
      });
    });

    it('should fetch the meals recommendations for drinks', async () => {
      const mockMainFetchSpy = mockFetchs(fetchById, MOCK_FETCH_BY_ID_RETURN_DRINK);
      const mockFetchByNameSpy = mockFetchs(fetchByName, MOCK_FETCH_BY_NAME_RETURN_MEALS);

      renderWithRouter(<Details />, { initialEntries: ['/drinks/17256'] });

      expect(mockMainFetchSpy).toHaveBeenCalledTimes(1);
      expect(mockMainFetchSpy).toHaveBeenCalledWith('', 'drinks');
      expect(mockFetchByNameSpy).toHaveBeenCalledTimes(1);
      expect(mockFetchByNameSpy).toHaveBeenCalledWith('', 'meals');

      const { cards, titles } = await getRecomendations();

      expect(cards).toHaveLength(6);

      titles.forEach((title, index) => {
        expect(title).toHaveTextContent(mealFormattedSearchByNameMock[index].name);
      });
    });
  });

  it('should render a error message if the fetch fails', async () => {
    const mockMainFetchSpy = mockFetchs(fetchById, { recipe: undefined, loading: false, error: 'error' });
    const mockFetchByNameSpy = mockFetchs(fetchByName, MOCK_FETCH_BY_NAME_RETURN_DRINKS);

    renderWithRouter(<Details />, INITIAL_ENTRIES);

    expect(mockMainFetchSpy).toHaveBeenCalledTimes(1);
    expect(mockFetchByNameSpy).toHaveBeenCalledTimes(1);

    expect(await screen.findByText('Erro ao carregar')).toBeInTheDocument();
  });

  it('should render a loading message', async () => {
    const mockMainFetchSpy = mockFetchs(fetchById, { recipe: undefined, loading: true, error: '' });
    const mockFetchByNameSpy = mockFetchs(fetchByName, MOCK_FETCH_BY_NAME_RETURN_DRINKS);

    renderWithRouter(<Details />, INITIAL_ENTRIES);

    expect(mockMainFetchSpy).toHaveBeenCalledTimes(1);
    expect(mockFetchByNameSpy).toHaveBeenCalledTimes(1);

    expect(await screen.findByText('Loading...')).toBeInTheDocument();
  });
});
