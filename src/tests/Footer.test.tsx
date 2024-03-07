import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from './utils';

const setup = () => {
  const imgDrinks = screen.getByTestId('drinks-bottom-btn');
  const imgMeals = screen.getByTestId('meals-bottom-btn');
  const btnMeals = screen.getByTestId('btn-meals');
  const btnDrinks = screen.getByTestId('btn-drinks');
  return { imgDrinks, imgMeals, btnDrinks, btnMeals };
};

test('Testa se as imagens estão sendo exibidas corretamente" ', () => {
  renderWithRouter(<App />, { initialEntries: ['/meals'] });
  const { imgDrinks, imgMeals } = setup();
  expect(imgDrinks).toBeInTheDocument();
  expect(imgDrinks).toHaveAttribute('src', 'src/images/drinkIcon.svg');
  expect(imgMeals).toBeInTheDocument();
  expect(imgMeals).toHaveAttribute('src', 'src/images/mealIcon.svg');
});

test('Teste se ao clicar no icone do Meals, é direcionado a rota "/meals" ', async () => {
  renderWithRouter(<App />, { initialEntries: ['/meals'] });
  const { imgMeals, btnMeals } = setup();
  expect(imgMeals).toBeInTheDocument();

  await userEvent.click(btnMeals);
  expect(screen.getByText('Meals')).toBeInTheDocument();
});

test('Teste se ao clicar no icone do Meals, é direcionado a rota "/drinks" ', async () => {
  renderWithRouter(<App />, { initialEntries: ['/meals'] });
  const { imgDrinks, btnDrinks } = setup();
  expect(imgDrinks).toBeInTheDocument();

  await userEvent.click(btnDrinks);
  expect(screen.getByText('Drinks')).toBeInTheDocument();
});
