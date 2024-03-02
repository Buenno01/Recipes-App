import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import App from '../App';
import { DoneRecipesContext } from '../contexts/DoneRecipesContext';
import { DONE_RECIPES_MOCK } from './doneRecipesMock';
import { renderWithRouter } from './utils';

const INITIAL_ENTRIES = { initialEntries: ['/done-recipes'] };
const INDEX_MOCK = [0, 1];

describe('Copy to clipboard', () => {
  // const urlMock = `/${DONE_RECIPES_MOCK[INDEX_MOCK[0]].type}s/${DONE_RECIPES_MOCK[INDEX_MOCK[0]].id}`;
  // const originalClipboard = navigator.clipboard;

  /* const CLIPBOARD_MOCK = {
    ...navigator.clipboard,
    writeText: vi.fn(),
    readText: vi.fn().mockReturnValue(urlMock),
  };

  Object.defineProperty(navigator, 'clipboard', {
    value: CLIPBOARD_MOCK,
    writable: true,
    configurable: true,
  });
*/

  test('Copied element', async () => {
    renderWithRouter(
      <DoneRecipesContext.Provider value={ { doneRecipesContext: DONE_RECIPES_MOCK, setDoneRecipesContext: () => {} } }>
        <App />
      </DoneRecipesContext.Provider>,
      INITIAL_ENTRIES,
    );
    const button = await screen.findByTestId(`${INDEX_MOCK[0]}-MY-horizontal-share-btn-onclick`);
    expect(button).toBeInTheDocument();
    // expect(CLIPBOARD_MOCK.writeText).toHaveBeenCalledTimes(0);
    await userEvent.click(button);
    const text = await screen.findByText('Link copied!');
    expect(text).toBeInTheDocument();
    // expect(CLIPBOARD_MOCK.writeText).toHaveBeenCalledTimes(1);
  });
/*
  Object.defineProperty(navigator, 'clipboard', {
    writable: true,
    configurable: true,
    value: originalClipboard,
  });
  */
});
