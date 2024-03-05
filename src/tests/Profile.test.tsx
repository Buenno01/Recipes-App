import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndProviders } from './utils';
import Profile from '../pages/Profile';
import mockLocalStorage from './mocks/mockLocalStorage';

const PROFILE_ROUTE = { initialEntries: ['/profile'] };

const getEveryElement = async () => [
  await screen.findByTestId('profile-email'),
  await screen.findByTestId('profile-done-btn'),
  await screen.findByTestId('profile-favorite-btn'),
  await screen.findByTestId('profile-logout-btn'),
];

describe('Profile', () => {
  it('should render the profile page', async () => {
    mockLocalStorage.profile();
    renderWithRouterAndProviders(<Profile />, PROFILE_ROUTE);

    const everyElement = await getEveryElement();
    everyElement.forEach((element) => expect(element).toBeInTheDocument());
  });

  it('should render the profile page with the correct email', async () => {
    mockLocalStorage.profile();
    renderWithRouterAndProviders(<Profile />, PROFILE_ROUTE);

    const [email] = await getEveryElement();
    expect(email).toHaveTextContent('example@email.com');
  });

  it('should have 3 buttons', async () => {
    mockLocalStorage.profile();
    renderWithRouterAndProviders(<Profile />, PROFILE_ROUTE);

    const [, doneBtn, favoriteBtn, logoutBtn] = await getEveryElement();
    expect(doneBtn).toBeInTheDocument();
    expect(doneBtn).toHaveTextContent('Done Recipes');
    expect(favoriteBtn).toBeInTheDocument();
    expect(favoriteBtn).toHaveTextContent('Favorite Recipes');
    expect(logoutBtn).toBeInTheDocument();
    expect(logoutBtn).toHaveTextContent('Logout');
  });

  it('should redirect to the done recipes page', async () => {
    mockLocalStorage.profile();
    renderWithRouterAndProviders(<Profile />, PROFILE_ROUTE);

    const [, doneBtn] = await getEveryElement();
    await userEvent.click(doneBtn);
    expect(window.location.pathname).toBe('/done-recipes');
  });

  it('should redirect to the favorite recipes page', async () => {
    mockLocalStorage.profile();
    renderWithRouterAndProviders(<Profile />, PROFILE_ROUTE);

    const [, , favoriteBtn] = await getEveryElement();
    await userEvent.click(favoriteBtn);
    expect(window.location.pathname).toBe('/favorite-recipes');
  });

  it('should redirect to the login page', async () => {
    mockLocalStorage.profile();
    renderWithRouterAndProviders(<Profile />, PROFILE_ROUTE);

    const [, , , logoutBtn] = await getEveryElement();
    await userEvent.click(logoutBtn);
    expect(window.location.pathname).toBe('/');

    vi.restoreAllMocks();

    expect(localStorage.getItem('user')).toBeNull();
  });
});
