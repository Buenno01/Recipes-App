import { render } from '@testing-library/react';
import { ReactElement } from 'react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import CombinedProviders from '../contexts/CombinedProviders';
// import CombinedProviders from '../contexts/CombinedProviders';

const wrapWithRouter = (ui: ReactElement, initialEntries = ['/']) => {
  window.history.pushState({}, '', initialEntries[0]);
  return (
    <MemoryRouter initialEntries={ initialEntries }>
      {ui}
    </MemoryRouter>
  );
};

const wrapWithProviders = (ui: ReactElement) => (
  <CombinedProviders>
    { ui }
  </CombinedProviders>
);

export const renderWithRouter = (ui: ReactElement, { initialEntries = ['/'] } = {}) => {
  return {
    user: userEvent.setup(),
    ...render(wrapWithRouter(ui, initialEntries)),
  };
};

export const renderWithRouterAndProviders = (
  ui: ReactElement,
  { initialEntries = ['/'] } = {},
) => {
  return {
    user: userEvent.setup(),
    ...render(wrapWithProviders(wrapWithRouter(ui, initialEntries))),
  };
};
