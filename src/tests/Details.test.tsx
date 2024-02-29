import { screen, waitForElementToBeRemoved } from '@testing-library/dom';
import { vi } from 'vitest';
import { renderWithRouter } from './utils';
import { mealMock } from './mock';
import Details from '../pages/RecipeDetails';

describe.skip('RecipeDetails', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    renderWithRouter(<Details />, { initialEntries: ['/meals/52771'] });
  });
  it('should render the details page', async () => {
    const mockSpy = vi.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => mealMock,
      ok: true,
      status: 200,
    } as Response);

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.getByText('Loading...'));

    expect(window.location.pathname).toBe('/meals/52771');
    expect(mockSpy).toHaveBeenCalledTimes(1);
  });
});
