import { screen } from '@testing-library/dom'; import App from '../App';
import { renderWithRouter } from './utils';

const setup = () => {
  const profileIcon = screen.queryByTestId('profile-top-btn');
  const pageTitle = screen.queryByTestId('page-title');
  const searchIcon = screen.queryByTestId('search-top-btn');
  const headerLayout = screen.queryByTestId('header-layout');
  return { profileIcon, pageTitle, searchIcon, headerLayout };
};

test('Teste do component Header na rota "/inexistente" ', () => {
  renderWithRouter(<App />, { initialEntries: ['/inexistente'] });
  const { headerLayout } = setup();
  expect(headerLayout).not.toBeInTheDocument();
});
test('Teste do component Header na rota "/" ', () => {
  renderWithRouter(<App />, { initialEntries: ['/'] });
  const { headerLayout } = setup();
  expect(headerLayout).not.toBeInTheDocument();
});

test('Teste do component Header na rota "/meals" ', () => {
  renderWithRouter(<App />, { initialEntries: ['/meals'] });
  const { headerLayout } = setup();
  expect(headerLayout).toBeInTheDocument();
});

test('Teste do component Header na rota "/drinks" ', () => {
  renderWithRouter(<App />, { initialEntries: ['/drinks'] });
  const { headerLayout } = setup();
  expect(headerLayout).toBeInTheDocument();
});

test('Teste do component Header na rota "/meals/:id" ', () => {
  renderWithRouter(<App />, { initialEntries: ['/meals/:id'] });
  const { headerLayout } = setup();
  expect(headerLayout).not.toBeInTheDocument();
});

test('Teste do component Header na rota "/drinks/:id" ', () => {
  renderWithRouter(<App />, { initialEntries: ['/drinks/:id'] });
  const { headerLayout } = setup();
  expect(headerLayout).not.toBeInTheDocument();
});

test('Teste do component Header na rota "/meals/:id/in-progress" ', () => {
  renderWithRouter(<App />, { initialEntries: ['/meals/:id/in-progress'] });
  const { headerLayout } = setup();
  expect(headerLayout).not.toBeInTheDocument();
});

test('Teste do component Header na rota "/drinks/:id/in-progress" ', () => {
  renderWithRouter(<App />, { initialEntries: ['/drinks/:id/in-progress'] });
  const { headerLayout } = setup();
  expect(headerLayout).not.toBeInTheDocument();
});

test('Teste do component Header na rota "/profile" ', () => {
  renderWithRouter(<App />, { initialEntries: ['/profile'] });
  const { headerLayout, profileIcon, searchIcon, pageTitle } = setup();
  expect(headerLayout).toBeInTheDocument();
  expect(profileIcon).toBeInTheDocument();
  expect(pageTitle).toBeInTheDocument();
  expect(searchIcon).not.toBeInTheDocument();
});

test('Teste do component Header na rota "/done-recipes" ', () => {
  renderWithRouter(<App />, { initialEntries: ['/done-recipes'] });
  const { headerLayout, profileIcon, searchIcon, pageTitle } = setup();
  expect(headerLayout).toBeInTheDocument();
  expect(profileIcon).toBeInTheDocument();
  expect(pageTitle).toBeInTheDocument();
  expect(searchIcon).not.toBeInTheDocument();
});

test('Teste do component Header na rota "/favorite-recipes" ', () => {
  renderWithRouter(<App />, { initialEntries: ['/favorite-recipes'] });
  const { headerLayout, profileIcon, searchIcon, pageTitle } = setup();
  expect(headerLayout).toBeInTheDocument();
  expect(profileIcon).toBeInTheDocument();
  expect(pageTitle).toBeInTheDocument();
  expect(searchIcon).not.toBeInTheDocument();
});
