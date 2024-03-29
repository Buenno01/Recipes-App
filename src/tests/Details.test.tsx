import { screen, waitFor } from '@testing-library/dom';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndProviders } from './utils';
import { formattedMealMock, mealFormattedSearchByNameMock } from './mocks/mealMocks';
import Details from '../pages/RecipeDetails';
import { favoriteDrinkMock, formattedDrinkSearchByNameMock } from './mocks/drinkMocks';
import { MealRecipeType } from '../@types/MealRecipeType';
import App from '../App';
import mockLocalStorage, { MOCK_IN_PROGRESS_STORAGE } from './mocks/mockLocalStorage';
import { customFetchRecipesByIDMock, fetchRecipeByIdMock, fetchRecipesByNameMock } from './mocks/mockFetchs';
import mockGlobalFetch from './mocks/mockGlobalFetch';

type RecommendationsReturnType = {
  cards: HTMLElement[];
  titles: HTMLElement[];
};

const MEALS = 'meals';
const DRINKS = 'drinks';

const INITIAL_ENTRIES = { initialEntries: ['/meals/52771'] };

const INITIAL_ENTRIES_DRINK = { initialEntries: ['/drinks/17256'] };

const FAV_BTN_TESTID = 'favorite-btn';

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
    const mockMainFetchSpy = fetchRecipeByIdMock(MEALS);
    const mockFetchByNameSpy = fetchRecipesByNameMock(DRINKS);
    renderWithRouterAndProviders(<Details />, INITIAL_ENTRIES);
    expect(window.location.pathname).toBe('/meals/52771');

    expect(mockMainFetchSpy).toHaveBeenCalledTimes(1);
    expect(mockFetchByNameSpy).toHaveBeenCalledTimes(1);
  });

  it('should render the meal correctly', async () => {
    fetchRecipeByIdMock(MEALS);
    fetchRecipesByNameMock(DRINKS);
    renderWithRouterAndProviders(<Details />, INITIAL_ENTRIES);

    const everything = await getTheDetailedRecipeInfos();

    const [image, title, category, instructions, video] = everything;

    everything.forEach((element) => expect(element).toBeInTheDocument());

    expect(image).toHaveAttribute('src', formattedMealMock.thumb);
    expect(title).toHaveTextContent(formattedMealMock.name);
    expect(category).toHaveTextContent(formattedMealMock.category);
    expect(instructions).toHaveTextContent(formattedMealMock.instructions);
    expect(video).toHaveAttribute('src', formattedMealMock.video);
  });

  it('if there is no measure, should render only the ingredient', async () => {
    const mockWithoutMeasure: MealRecipeType = {
      ...formattedMealMock,
      ingredients: ['Arroz'],
      measures: [],
    };
    customFetchRecipesByIDMock(mockWithoutMeasure);
    fetchRecipesByNameMock(DRINKS);
    renderWithRouterAndProviders(<Details />, INITIAL_ENTRIES);

    const ingredients = await screen.findAllByTestId('0-ingredient-name-and-measure');

    expect(ingredients).toHaveLength(1);

    expect(ingredients[0]).toHaveTextContent('Arroz');
  });

  describe('should fetch the recommendations corretly', () => {
    it('should fetch the drinks recommendations for meals', async () => {
      const mockMainFetchSpy = fetchRecipeByIdMock(MEALS);
      const mockFetchByNameSpy = fetchRecipesByNameMock(DRINKS);

      renderWithRouterAndProviders(<Details />, INITIAL_ENTRIES);

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
      const mockMainFetchSpy = fetchRecipeByIdMock(DRINKS);
      const mockFetchByNameSpy = fetchRecipesByNameMock(MEALS);

      renderWithRouterAndProviders(<Details />, INITIAL_ENTRIES_DRINK);

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
    const mockMainFetchSpy = customFetchRecipesByIDMock(undefined, false, 'error');
    const mockFetchByNameSpy = fetchRecipesByNameMock(DRINKS);

    renderWithRouterAndProviders(<Details />, INITIAL_ENTRIES);

    expect(mockMainFetchSpy).toHaveBeenCalledTimes(1);
    expect(mockFetchByNameSpy).toHaveBeenCalledTimes(1);

    expect(await screen.findByText('Erro ao carregar')).toBeInTheDocument();
  });

  it('should render a loading message', async () => {
    const mockMainFetchSpy = customFetchRecipesByIDMock(undefined, true, '');
    const mockFetchByNameSpy = fetchRecipesByNameMock(DRINKS);

    renderWithRouterAndProviders(<Details />, INITIAL_ENTRIES);

    expect(mockMainFetchSpy).toHaveBeenCalledTimes(1);
    expect(mockFetchByNameSpy).toHaveBeenCalledTimes(1);

    expect(await screen.findByText('Loading...')).toBeInTheDocument();
  });

  it('should be able to favorite a recipe', async () => {
    mockGlobalFetch();
    const spy = vi.spyOn(Storage.prototype, 'setItem');

    renderWithRouterAndProviders(<Details />, INITIAL_ENTRIES_DRINK);

    await waitFor(() => expect(localStorage.getItem('favoriteRecipes')).toBe('[]'));

    const favoriteButton = await screen.findByTestId(FAV_BTN_TESTID);
    expect(favoriteButton).toBeInTheDocument();

    await userEvent.click(favoriteButton);

    expect(spy).toHaveBeenLastCalledWith('favoriteRecipes', '[{"id":"17256","type":"drink","alcoholicOrNot":"Alcoholic","category":"Shot","image":"https://www.thecocktaildb.com/images/media/drink/vw7iv91493067320.jpg","name":"Auburn Headbanger","nationality":""}]');
  });

  it('should be able to unfavorite a recipe', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify([favoriteDrinkMock]));

    mockGlobalFetch();

    renderWithRouterAndProviders(<Details />, INITIAL_ENTRIES_DRINK);

    const favoriteButton = await screen.findByTestId(FAV_BTN_TESTID);
    expect(favoriteButton).toBeInTheDocument();

    await userEvent.click(favoriteButton);

    const elementOnLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');

    expect(elementOnLocalStorage).toHaveLength(0);
  });

  it('should render the correct favorite button', async () => {
    mockGlobalFetch();

    renderWithRouterAndProviders(<Details />, INITIAL_ENTRIES_DRINK);

    const favoriteButton = await screen.findByTestId(FAV_BTN_TESTID);
    expect(favoriteButton).toBeInTheDocument();

    expect(favoriteButton).toHaveAttribute('src', '/src/assets/images/whiteHeartIcon.svg');

    await userEvent.click(favoriteButton);

    expect(favoriteButton).toHaveAttribute('src', '/src/assets/images/blackHeartIcon.svg');
  });

  describe('Start Recipe Button', () => {
    const startRecipeButtonTestId = 'start-recipe-btn';

    beforeEach(() => {
      vi.restoreAllMocks();
    });

    it('should render the start recipe button', async () => {
      mockGlobalFetch();

      renderWithRouterAndProviders(<Details />, INITIAL_ENTRIES_DRINK);

      const startRecipeButton = await screen.findByTestId(startRecipeButtonTestId);

      expect(startRecipeButton).toBeInTheDocument();
      expect(startRecipeButton).toHaveTextContent('Start Recipe');
    });

    it('should render as continue recipe button if the recipe is in progress', async () => {
      mockLocalStorage.inProgressRecipes();
      mockGlobalFetch();

      renderWithRouterAndProviders(<App />, INITIAL_ENTRIES_DRINK);

      const startRecipeButton = await screen.findByTestId(startRecipeButtonTestId);

      expect(startRecipeButton).toBeInTheDocument();
      expect(startRecipeButton).toHaveTextContent('Continue Recipe');

      await userEvent.click(startRecipeButton);
    });

    it('should add the recipe to inProgressRecipes on click', async () => {
      mockLocalStorage.empty();
      const localStorageSpy = vi.spyOn(Storage.prototype, 'setItem');
      mockGlobalFetch();

      renderWithRouterAndProviders(<App />, INITIAL_ENTRIES_DRINK);

      const startRecipeButton = await screen.findByTestId(startRecipeButtonTestId);
      expect(startRecipeButton).toBeInTheDocument();

      expect(startRecipeButton).toHaveTextContent('Start Recipe');

      await userEvent.click(startRecipeButton);

      expect(localStorageSpy).toHaveBeenCalledWith('inProgressRecipes', MOCK_IN_PROGRESS_STORAGE);
    });

    it('should not render the start recipe button if the recipe is done', async () => {
      mockLocalStorage.doneRecipes();

      mockGlobalFetch();

      renderWithRouterAndProviders(<App />, { initialEntries: ['/meals/52772'] });

      const startRecipeButton = screen.queryByTestId(startRecipeButtonTestId);

      expect(startRecipeButton).not.toBeInTheDocument();
    });
  });
});
