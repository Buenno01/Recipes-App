import { render } from '@testing-library/react';
import { ReactElement } from 'react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const wrapWithRouter = (ui: ReactElement, initialEntries = ['/']) => {
  return (
    <MemoryRouter initialEntries={ initialEntries }>
      {ui}
    </MemoryRouter>
  );
};

const wrapWithProviders = (ui: ReactElement) => {
  const combinedProviders = (children: ReactElement) => (<p>{children}</p>);
  return combinedProviders(ui);
};

export const renderWithContext = (ui: ReactElement) => {
  // está faltando o provider do contexto
  return render(wrapWithProviders(ui));
};

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
