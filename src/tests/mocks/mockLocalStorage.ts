import { vi } from 'vitest';
import { DONE_RECIPES_MOCK } from './doneRecipesMock';
import { formattedDrinkMock as drinkRecipe, favoriteDrinkMock } from './drinkMocks';
import { favoriteMealMock } from './mealMocks';

export const MOCK_IN_PROGRESS_STORAGE = JSON.stringify({
  drinks: {
    17256: drinkRecipe.ingredients,
  },
});

export const MOCK_USER_STORAGE = JSON.stringify({
  email: 'example@email.com',
});

export const MOCK_DONE_STORAGE = JSON.stringify(DONE_RECIPES_MOCK);

export const MOCK_FAVORITE_STORAGE = JSON.stringify([
  favoriteDrinkMock,
  favoriteMealMock,
]);

const mockLocalStorage = {
  doneRecipes: () => {
    Storage.prototype.getItem = vi.fn((key: string) => {
      switch (key) {
        case 'inProgressRecipes': return '{}';
        case 'doneRecipes': return MOCK_DONE_STORAGE;
        case 'favoriteRecipes': return '[]';
        case 'user': return MOCK_USER_STORAGE;
        default: return null;
      }
    });
  },
  inProgressRecipes: () => {
    Storage.prototype.getItem = vi.fn((key: string) => {
      switch (key) {
        case 'inProgressRecipes': return MOCK_IN_PROGRESS_STORAGE;
        case 'doneRecipes': return '[]';
        case 'favoriteRecipes': return '[]';
        case 'user': return MOCK_USER_STORAGE;
        default: return null;
      }
    });
  },
  favoriteRecipes: () => {
    Storage.prototype.getItem = vi.fn((key: string) => {
      switch (key) {
        case 'inProgressRecipes': return '{}';
        case 'doneRecipes': return '[]';
        case 'favoriteRecipes': return MOCK_FAVORITE_STORAGE;
        case 'user': return MOCK_USER_STORAGE;
        default: return null;
      }
    });
  },
  profile: () => {
    Storage.prototype.getItem = vi.fn((key: string) => {
      switch (key) {
        case 'inProgressRecipes': return '{}';
        case 'doneRecipes': return '[]';
        case 'favoriteRecipes': return '[]';
        case 'user': return MOCK_USER_STORAGE;
        default: return null;
      }
    });
  },
  empty: () => {
    Storage.prototype.getItem = vi.fn((key: string) => {
      switch (key) {
        case 'inProgressRecipes': return '{}';
        case 'doneRecipes': return '[]';
        case 'favoriteRecipes': return '[]';
        case 'user': return '{}';
        default: return null;
      }
    });
  },
};

export default mockLocalStorage;
