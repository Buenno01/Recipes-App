import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import { renderWithRouterAndProviders } from './utils';
import { copyTextToClipBoard } from '../utils/copyTextToClipBoard';
import mockLocalStorage from './mocks/mockLocalStorage';

const INITIAL_ENTRIES = { initialEntries: ['/done-recipes'] };
const INDEX_MOCK = [0, 1];
const copiedLinkRes = 'Link copied!';

describe('Copy to clipboard', () => {
  test('Copied element response', async () => {
    mockLocalStorage.doneRecipes();
    const { user } = renderWithRouterAndProviders(
      <App />,
      INITIAL_ENTRIES,
    );
    const button = await screen.findByTestId(`${INDEX_MOCK[0]}-horizontal-share-btn`);
    expect(button).toBeInTheDocument();
    await user.click(button);
    const text = await screen.findByText(copiedLinkRes);
    expect(text).toBeInTheDocument();
    await waitFor(() => {
      const newText = screen.queryByText(copiedLinkRes);
      expect(newText).toBeNull();
    }, { timeout: 1000 });
  });

  test('Copied text should be "Link copied"!', async () => {
    mockLocalStorage.doneRecipes();
    renderWithRouterAndProviders(
      <App />,
      INITIAL_ENTRIES,
    );
    const copiedText = await copyTextToClipBoard('test');
    expect(copiedText).toBe(copiedLinkRes);
  });
});
