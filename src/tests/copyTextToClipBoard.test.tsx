import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import { DoneRecipesContext } from '../contexts/DoneRecipesContext';
import { DONE_RECIPES_MOCK } from './mocks/doneRecipesMock';
import { renderWithRouter } from './utils';
import { copyTextToClipBoard } from '../utils/copyTextToClipBoard';

const INITIAL_ENTRIES = { initialEntries: ['/done-recipes'] };
const INDEX_MOCK = [0, 1];
const copiedLinkRes = 'Link copied!';

describe('Copy to clipboard', () => {
  test('Copied element response', async () => {
    const { user } = renderWithRouter(
      <DoneRecipesContext.Provider value={ { doneRecipesContext: DONE_RECIPES_MOCK, setDoneRecipesContext: () => {} } }>
        <App />
      </DoneRecipesContext.Provider>,
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
    renderWithRouter(
      <DoneRecipesContext.Provider value={ { doneRecipesContext: DONE_RECIPES_MOCK, setDoneRecipesContext: () => {} } }>
        <App />
      </DoneRecipesContext.Provider>,
      INITIAL_ENTRIES,
    );
    const copiedText = await copyTextToClipBoard('test');
    expect(copiedText).toBe(copiedLinkRes);
  });
});
