import { screen, waitFor } from '@testing-library/dom';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndProviders } from './utils';
import { formattedMealMock, mealFormattedSearchByNameMock } from './mealMocks';
import Details from '../pages/RecipeDetails';
import * as fetchById from '../services/useFetchDrinkOrFoodById';
import * as fetchByName from '../services/useFetchDrinkOrFoodByName';
import { AnyRecipeType } from '../@types/AnyRecipeType';
import { favoriteDrinkMock, formattedDrinkMock, formattedDrinkSearchByNameMock } from './drinkMocks';
import { MealRecipeType } from '../@types/MealRecipeType';
import { DONE_RECIPES_MOCK as doneRecipesMock } from './doneRecipesMock';
import App from '../App';

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

const MOCK_IN_PROGRESS_STORAGE = JSON.stringify({
  drinks: {
    17256: formattedDrinkMock.ingredients,
  },
});

const INITIAL_ENTRIES = { initialEntries: ['/meals/52771'] };

const INITIAL_ENTRIES_DRINK = { initialEntries: ['/drinks/17256'] };

const FAV_BTN_TESTID = 'favorite-btn';

const mockFetchs = (module: any, response: FetchReturnsType, method = 'default') => vi.spyOn(module, method).mockReturnValue(response);

const mockBothFetchs = (responseById: FetchReturnsType, responseByName: FetchReturnsType) => {
  mockFetchs(fetchById, responseById);
  mockFetchs(fetchByName, responseByName);
};

const mockLocalStorage = {
  doneRecipes: () => {
    Storage.prototype.getItem = vi.fn((key: string) => {
      if (key === 'inProgressRecipes') return '{}';
      if (key === 'doneRecipes') return JSON.stringify(doneRecipesMock);
      return null;
    });
  },
  inProgressRecipes: () => {
    Storage.prototype.getItem = vi.fn((key: string) => {
      if (key === 'inProgressRecipes') return MOCK_IN_PROGRESS_STORAGE;
      if (key === 'doneRecipes') return '[]';
      return null;
    });
  },
  empty: () => {
    Storage.prototype.getItem = vi.fn((key: string) => {
      if (key === 'inProgressRecipes') return '{}';
      if (key === 'doneRecipes') return '[]';
      return null;
    });
  },
};

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
    renderWithRouterAndProviders(<Details />, INITIAL_ENTRIES);
    expect(window.location.pathname).toBe('/meals/52771');

    expect(mockMainFetchSpy).toHaveBeenCalledTimes(1);
    expect(mockFetchByNameSpy).toHaveBeenCalledTimes(1);
  });

  it('should render the meal correctly', async () => {
    mockBothFetchs(MOCK_FETCH_BY_ID_RETURN_MEAL, MOCK_FETCH_BY_NAME_RETURN_DRINKS);
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
    mockBothFetchs({ ...MOCK_FETCH_BY_ID_RETURN_MEAL, recipe: mockWithoutMeasure }, MOCK_FETCH_BY_NAME_RETURN_DRINKS);
    renderWithRouterAndProviders(<Details />, INITIAL_ENTRIES);

    const ingredients = await screen.findAllByTestId('0-ingredient-name-and-measure');

    expect(ingredients).toHaveLength(1);

    expect(ingredients[0]).toHaveTextContent('Arroz');
  });

  describe('should fetch the recommendations corretly', () => {
    it('should fetch the drinks recommendations for meals', async () => {
      const mockMainFetchSpy = mockFetchs(fetchById, MOCK_FETCH_BY_ID_RETURN_MEAL);
      const mockFetchByNameSpy = mockFetchs(fetchByName, MOCK_FETCH_BY_NAME_RETURN_DRINKS);

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
      const mockMainFetchSpy = mockFetchs(fetchById, MOCK_FETCH_BY_ID_RETURN_DRINK);
      const mockFetchByNameSpy = mockFetchs(fetchByName, MOCK_FETCH_BY_NAME_RETURN_MEALS);

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
    const mockMainFetchSpy = mockFetchs(fetchById, { recipe: undefined, loading: false, error: 'error' });
    const mockFetchByNameSpy = mockFetchs(fetchByName, MOCK_FETCH_BY_NAME_RETURN_DRINKS);

    renderWithRouterAndProviders(<Details />, INITIAL_ENTRIES);

    expect(mockMainFetchSpy).toHaveBeenCalledTimes(1);
    expect(mockFetchByNameSpy).toHaveBeenCalledTimes(1);

    expect(await screen.findByText('Erro ao carregar')).toBeInTheDocument();
  });

  it('should render a loading message', async () => {
    const mockMainFetchSpy = mockFetchs(fetchById, { recipe: undefined, loading: true, error: '' });
    const mockFetchByNameSpy = mockFetchs(fetchByName, MOCK_FETCH_BY_NAME_RETURN_DRINKS);

    renderWithRouterAndProviders(<Details />, INITIAL_ENTRIES);

    expect(mockMainFetchSpy).toHaveBeenCalledTimes(1);
    expect(mockFetchByNameSpy).toHaveBeenCalledTimes(1);

    expect(await screen.findByText('Loading...')).toBeInTheDocument();
  });

  it('should be able to favorite a recipe', async () => {
    mockBothFetchs(MOCK_FETCH_BY_ID_RETURN_DRINK, MOCK_FETCH_BY_NAME_RETURN_MEALS);

    renderWithRouterAndProviders(<Details />, INITIAL_ENTRIES_DRINK);

    await waitFor(() => expect(localStorage.getItem('favoriteRecipes')).toBe('[]'));

    const favoriteButton = await screen.findByTestId(FAV_BTN_TESTID);
    expect(favoriteButton).toBeInTheDocument();

    await userEvent.click(favoriteButton);

    const elementOnLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');

    expect(elementOnLocalStorage).toHaveLength(1);
    expect(elementOnLocalStorage[0]).toEqual(favoriteDrinkMock);
  });

  it('should be able to unfavorite a recipe', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify([favoriteDrinkMock]));

    mockBothFetchs(MOCK_FETCH_BY_ID_RETURN_DRINK, MOCK_FETCH_BY_NAME_RETURN_MEALS);

    renderWithRouterAndProviders(<Details />, INITIAL_ENTRIES_DRINK);

    const favoriteButton = await screen.findByTestId(FAV_BTN_TESTID);
    expect(favoriteButton).toBeInTheDocument();

    await userEvent.click(favoriteButton);

    const elementOnLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');

    expect(elementOnLocalStorage).toHaveLength(0);
  });

  it('should render the correct favorite button', async () => {
    mockBothFetchs(MOCK_FETCH_BY_ID_RETURN_DRINK, MOCK_FETCH_BY_NAME_RETURN_MEALS);

    renderWithRouterAndProviders(<Details />, INITIAL_ENTRIES_DRINK);

    const favoriteButton = await screen.findByTestId(FAV_BTN_TESTID);
    expect(favoriteButton).toBeInTheDocument();

    expect(favoriteButton).toHaveAttribute('src', '/src/images/whiteHeartIcon.svg');

    await userEvent.click(favoriteButton);

    expect(favoriteButton).toHaveAttribute('src', '/src/images/blackHeartIcon.svg');
  });

  describe('Start Recipe Button', () => {
    const startRecipeButtonTestId = 'start-recipe-btn';

    beforeEach(() => {
      vi.restoreAllMocks();
    });

    it('should render the start recipe button', async () => {
      mockBothFetchs(MOCK_FETCH_BY_ID_RETURN_DRINK, MOCK_FETCH_BY_NAME_RETURN_MEALS);

      renderWithRouterAndProviders(<Details />, INITIAL_ENTRIES_DRINK);

      const startRecipeButton = await screen.findByTestId(startRecipeButtonTestId);

      expect(startRecipeButton).toBeInTheDocument();
      expect(startRecipeButton).toHaveTextContent('Start Recipe');
    });

    it('should render as continue recipe button if the recipe is in progress', async () => {
      mockLocalStorage.inProgressRecipes();
      const setLocalStorageSpy = vi.spyOn(Storage.prototype, 'setItem');

      mockBothFetchs(MOCK_FETCH_BY_ID_RETURN_DRINK, MOCK_FETCH_BY_NAME_RETURN_MEALS);

      renderWithRouterAndProviders(<App />, INITIAL_ENTRIES_DRINK);
      screen.debug();
      console.log('Storage.prototype.getItem', localStorage.getItem('inProgressRecipes'));

      const startRecipeButton = await screen.findByTestId(startRecipeButtonTestId);

      expect(startRecipeButton).toBeInTheDocument();
      expect(startRecipeButton).toHaveTextContent('Continue Recipe');

      await userEvent.click(startRecipeButton);

      expect(setLocalStorageSpy).not.toHaveBeenCalledWith('inProgressRecipes', MOCK_IN_PROGRESS_STORAGE);
    });

    it('should add the recipe to inProgressRecipes on click', async () => {
      mockLocalStorage.empty();
      const localStorageSpy = vi.spyOn(Storage.prototype, 'setItem');
      mockBothFetchs(MOCK_FETCH_BY_ID_RETURN_DRINK, MOCK_FETCH_BY_NAME_RETURN_MEALS);

      renderWithRouterAndProviders(<App />, INITIAL_ENTRIES_DRINK);

      const startRecipeButton = await screen.findByTestId(startRecipeButtonTestId);
      expect(startRecipeButton).toBeInTheDocument();

      expect(startRecipeButton).toHaveTextContent('Start Recipe');

      await userEvent.click(startRecipeButton);

      expect(localStorageSpy).toHaveBeenCalledTimes(3);

      expect(localStorageSpy).toHaveBeenLastCalledWith('inProgressRecipes', MOCK_IN_PROGRESS_STORAGE);
    });

    it('should not render the start recipe button if the recipe is done', async () => {
      mockLocalStorage.doneRecipes();

      mockBothFetchs(MOCK_FETCH_BY_ID_RETURN_MEAL, MOCK_FETCH_BY_NAME_RETURN_DRINKS);

      renderWithRouterAndProviders(<App />, { initialEntries: ['/meals/52772'] });

      const startRecipeButton = screen.queryByTestId(startRecipeButtonTestId);

      screen.debug();
      expect(startRecipeButton).not.toBeInTheDocument();
    });
  });
});
