import { screen, waitFor } from '@testing-library/dom';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndProviders } from './utils';
import { globalFetchMock } from './mocks/mockGlobalFetch';
import App from '../App';

const MEALS_ROUTE = { initialEntries: ['/meals'] };
const DRINKS_ROUTE = { initialEntries: ['/drinks'] };
const BASE_MEAL_URL = 'https://www.themealdb.com/api/json/v1/1/';
const BASE_DRINK_URL = 'https://www.thecocktaildb.com/api/json/v1/1/';
const SEARCH = 'search.php?';
const FILTER = 'filter.php?';
const SPECIFIC_MEAL_NAME = 'Spicy Arrabiata Penne';
const SPECIFIC_MEAL_NAME_ENDPOINT = `${BASE_MEAL_URL + SEARCH}s=${SPECIFIC_MEAL_NAME}`;
const SPECIFIC_DRINK_NAME = 'Auburn Headbanger';
const SPECIFIC_DRINK_NAME_ENDPOINT = `${BASE_DRINK_URL + SEARCH}s=${SPECIFIC_DRINK_NAME}`;
const SPECIFIC_MEAL_INGREDIENT = 'Beef';
const SPECIFIC_MEAL_INGREDIENT_ENDPOINT = `${BASE_MEAL_URL + FILTER}i=${SPECIFIC_MEAL_INGREDIENT}`;
const SPECIFIC_DRINK_INGREDIENT = 'Vodka';
const SPECIFIC_DRINK_INGREDIENT_ENDPOINT = `${BASE_DRINK_URL + FILTER}i=${SPECIFIC_DRINK_INGREDIENT}`;
const FIRST_LETTER = 'f';
const MEAL_FIRST_LETTER_ENDPOINT = `${BASE_MEAL_URL + SEARCH}f=${FIRST_LETTER}`;
const DRINK_FIRST_LETTER_ENDPOINT = `${BASE_DRINK_URL + SEARCH}f=${FIRST_LETTER}`;

const getBtnAndTextInput = async () => [
  await screen.findByTestId('exec-search-btn'),
  await screen.findByTestId('search-input'),
];

const getRadioInputs = async () => ({
  nameRadio: await screen.findByTestId('name-search-radio'),
  firstLetterRadio: await screen.findByTestId('first-letter-search-radio'),
  ingredientRadio: await screen.findByTestId('ingredient-search-radio'),
});

const getShowSearchBtn = () => screen.getByTestId('search-top-btn');

const execSearch = async (param: string, radio: HTMLElement, btnAndTextInput: HTMLElement[]) => {
  const [searchBtn, searchInput] = btnAndTextInput;
  await userEvent.clear(searchInput);
  await userEvent.type(searchInput, param);
  await userEvent.click(radio);
  await userEvent.click(searchBtn);
};

describe.skip('SearchBar', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should render when clicking the serch icon', async () => {
    globalFetchMock();
    renderWithRouterAndProviders(<App />, MEALS_ROUTE);

    const showSearchBtn = getShowSearchBtn();
    await userEvent.click(showSearchBtn);

    const everything = [...Object.values(await getRadioInputs()), ...await getBtnAndTextInput()];

    everything.forEach((element) => expect(element).toBeInTheDocument());
  });

  describe('should call the correct endpoint when the search btn is clicked', async () => {
    it('Meals', async () => {
      const spy = globalFetchMock();
      renderWithRouterAndProviders(<App />, MEALS_ROUTE);

      const showSearchBtn = getShowSearchBtn();
      await userEvent.click(showSearchBtn);

      const { nameRadio, firstLetterRadio, ingredientRadio } = await getRadioInputs();

      const btnAndTextInput = await getBtnAndTextInput();

      await execSearch(FIRST_LETTER, firstLetterRadio, btnAndTextInput);
      await waitFor(() => {
        expect(spy).toHaveBeenCalledWith(MEAL_FIRST_LETTER_ENDPOINT);
      });

      await execSearch(SPECIFIC_MEAL_INGREDIENT, ingredientRadio, btnAndTextInput);
      await waitFor(() => {
        expect(spy).toHaveBeenCalledWith(SPECIFIC_MEAL_INGREDIENT_ENDPOINT);
      });

      await execSearch(SPECIFIC_MEAL_NAME, nameRadio, btnAndTextInput);
      await waitFor(() => {
        expect(spy).toHaveBeenCalledWith(SPECIFIC_MEAL_NAME_ENDPOINT);
      });
    });

    it('Drinks', async () => {
      const spy = globalFetchMock();
      renderWithRouterAndProviders(<App />, DRINKS_ROUTE);

      const showSearchBtn = getShowSearchBtn();
      await userEvent.click(showSearchBtn);

      const { nameRadio, firstLetterRadio, ingredientRadio } = await getRadioInputs();

      const btnAndTextInput = await getBtnAndTextInput();

      await execSearch(FIRST_LETTER, firstLetterRadio, btnAndTextInput);
      await waitFor(() => {
        expect(spy).toHaveBeenCalledWith(DRINK_FIRST_LETTER_ENDPOINT);
      });

      await execSearch(SPECIFIC_DRINK_INGREDIENT, ingredientRadio, btnAndTextInput);
      await waitFor(() => {
        expect(spy).toHaveBeenCalledWith(SPECIFIC_DRINK_INGREDIENT_ENDPOINT);
      });

      await execSearch(SPECIFIC_DRINK_NAME, nameRadio, btnAndTextInput);
      await waitFor(() => {
        expect(spy).toHaveBeenCalledWith(SPECIFIC_DRINK_NAME_ENDPOINT);
      });
    });
  });

  it('should alert if there\'s more than one letter and the first-letter radio is selected', async () => {
    globalFetchMock();
    const alertSpy = vi.spyOn(window, 'alert');
    renderWithRouterAndProviders(<App />, MEALS_ROUTE);

    const showSearchBtn = getShowSearchBtn();
    await userEvent.click(showSearchBtn);

    const { firstLetterRadio } = await getRadioInputs();
    const btnAndTextInput = await getBtnAndTextInput();

    await waitFor(() => {
      expect(alertSpy).not.toHaveBeenCalled();
    });

    await execSearch('ab', firstLetterRadio, btnAndTextInput);

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalled();
    });
  });

  describe('should navigate to details page when there\'s only one result when searched by name', async () => {
    const getStartRecipeBtn = () => screen.getByTestId('start-recipe-btn');
    beforeEach(() => {
      vi.restoreAllMocks();
    });

    it('Meals', async () => {
      const spy = globalFetchMock();
      renderWithRouterAndProviders(<App />, MEALS_ROUTE);

      const showSearchBtn = getShowSearchBtn();
      await userEvent.click(showSearchBtn);

      const { nameRadio } = await getRadioInputs();
      const btnAndTextInput = await getBtnAndTextInput();

      await execSearch(SPECIFIC_MEAL_NAME, nameRadio, btnAndTextInput);

      await waitFor(() => {
        expect(spy).toHaveBeenCalledWith(SPECIFIC_MEAL_NAME_ENDPOINT);
        expect(screen.getByText(SPECIFIC_MEAL_NAME)).toBeInTheDocument();
        expect(getStartRecipeBtn()).toBeInTheDocument();
      });
    });

    it('Drinks', async () => {
      const spy = globalFetchMock();
      renderWithRouterAndProviders(<App />, DRINKS_ROUTE);

      const showSearchBtn = getShowSearchBtn();
      await userEvent.click(showSearchBtn);

      const { nameRadio } = await getRadioInputs();
      const btnAndTextInput = await getBtnAndTextInput();

      await execSearch(SPECIFIC_DRINK_NAME, nameRadio, btnAndTextInput);

      await waitFor(() => {
        expect(spy).toHaveBeenCalledWith(SPECIFIC_DRINK_NAME_ENDPOINT);
        expect(screen.getByText(SPECIFIC_DRINK_NAME)).toBeInTheDocument();
        expect(getStartRecipeBtn()).toBeInTheDocument();
      });
    });
  });

  it('should alert if there\'s no result when searched by name', async () => {
    globalFetchMock();
    const alertSpy = vi.spyOn(window, 'alert');
    renderWithRouterAndProviders(<App />, MEALS_ROUTE);

    const showSearchBtn = getShowSearchBtn();
    await userEvent.click(showSearchBtn);

    const { nameRadio } = await getRadioInputs();
    const btnAndTextInput = await getBtnAndTextInput();

    await waitFor(() => {
      expect(alertSpy).not.toHaveBeenCalled();
    });

    await execSearch('non-existent', nameRadio, btnAndTextInput);

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalled();
    });
  });
});
