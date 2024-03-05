import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndProviders } from './utils';
import Profile from '../pages/Profile';
import mockLocalStorage from './mocks/mockLocalStorage';
import App from '../App';

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
    renderWithRouterAndProviders(<App />, PROFILE_ROUTE);

    const [, doneBtn] = await getEveryElement();
    await userEvent.click(doneBtn);
    expect(screen.getByText(/done recipes/i)).toBeInTheDocument();
  });

  it('should redirect to the favorite recipes page', async () => {
    mockLocalStorage.profile();
    renderWithRouterAndProviders(<App />, PROFILE_ROUTE);

    const [, , favoriteBtn] = await getEveryElement();
    await userEvent.click(favoriteBtn);
    expect(screen.getByText(/favorite recipes/i)).toBeInTheDocument();
  });

  it('should redirect to the login page', async () => {
    mockLocalStorage.profile();
    const spy = vi.spyOn(Storage.prototype, 'clear');
    renderWithRouterAndProviders(<App />, PROFILE_ROUTE);

    const [, , , logoutBtn] = await getEveryElement();

    await userEvent.click(logoutBtn);
    expect(screen.getByText(/login/i)).toBeInTheDocument();

    expect(spy).toBeCalledTimes(1);
  });
});
