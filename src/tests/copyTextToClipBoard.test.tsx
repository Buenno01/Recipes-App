import { screen } from '@testing-library/react';
import App from '../App';
import { DoneRecipesContext } from '../contexts/DoneRecipesContext';
import { DONE_RECIPES_MOCK } from './doneRecipesMock';
import { renderWithRouter } from './utils';
import { copyTextToClipBoard } from '../utils/copyTextToClipBoard';

const INITIAL_ENTRIES = { initialEntries: ['/done-recipes'] };
const INDEX_MOCK = [0, 1];

describe('Copy to clipboard', () => {
  test('Copied element response', async () => {
    const { user } = renderWithRouter(
      <DoneRecipesContext.Provider value={ { doneRecipesContext: DONE_RECIPES_MOCK, setDoneRecipesContext: () => {} } }>
        <App />
      </DoneRecipesContext.Provider>,
      INITIAL_ENTRIES,
    );
    const button = await screen.findByTestId(`${INDEX_MOCK[0]}-MY-horizontal-share-btn-onclick`);
    expect(button).toBeInTheDocument();
    await user.click(button);
    const text = await screen.findByText('Link copied!');
    expect(text).toBeInTheDocument();
  });

  test('Copied text should be "Link copied"!', async () => {
    renderWithRouter(
      <DoneRecipesContext.Provider value={ { doneRecipesContext: DONE_RECIPES_MOCK, setDoneRecipesContext: () => {} } }>
        <App />
      </DoneRecipesContext.Provider>,
      INITIAL_ENTRIES,
    );
    const copiedText = await copyTextToClipBoard('test');
    expect(copiedText).toBe('Link copied!');
  });
});
