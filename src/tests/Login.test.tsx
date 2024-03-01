import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './utils';
import App from '../App';

const setup = () => {
  renderWithRouter(<App />);
  const inputEmail = screen.getByTestId('email-input');
  const inputPassword = screen.getByTestId('password-input');
  const btnLogin = screen.getByTestId('login-submit-btn');
  return { inputEmail, inputPassword, btnLogin };
};

test('Input de email, senha e botão está presente no documento', () => {
  const { inputEmail, inputPassword, btnLogin } = setup();
  expect(inputEmail).toBeInTheDocument();
  expect(inputPassword).toBeInTheDocument();
  expect(btnLogin).toBeInTheDocument();
});

test('Verifica se o botão tem a propriedade "disabled" com diferentes entradas', async () => {
  const { inputEmail, inputPassword, btnLogin } = setup();

  expect(btnLogin).toBeDisabled();

  await userEvent.type(inputEmail, 'emailInvalido');
  await userEvent.type(inputPassword, '12345');
  expect(btnLogin).toBeDisabled();

  await userEvent.clear(inputEmail);
  await userEvent.type(inputEmail, 'emailvalido@valido.com');
  await userEvent.clear(inputPassword);
  await userEvent.type(inputPassword, '12345');
  expect(btnLogin).toBeDisabled();

  await userEvent.clear(inputEmail);
  await userEvent.type(inputEmail, 'emailInvalido');
  await userEvent.clear(inputPassword);
  await userEvent.type(inputPassword, '123456');
  expect(btnLogin).toBeDisabled();

  await userEvent.clear(inputEmail);
  await userEvent.type(inputEmail, 'emailvalido@valido.com');
  await userEvent.clear(inputPassword);
  await userEvent.type(inputPassword, '12345678');
  expect(btnLogin).toBeEnabled();
});

test('Verifica se o email é salvo no Local Storage após o clique no botão', async () => {
  const { inputEmail, inputPassword, btnLogin } = setup();

  const email = 'emailvalido@valid.com';
  const password = '12345678';

  await userEvent.type(inputEmail, email);
  await userEvent.type(inputPassword, password);
  await userEvent.click(btnLogin);

  expect(localStorage.getItem('user')).toEqual(`{"email":"${email}"}`);
});

test('Verifica se é redirecionado a rota /meals', async () => {
  const { inputEmail, inputPassword, btnLogin } = setup();

  const email = 'emailvalido@valid.com';
  const password = '12345678';

  await userEvent.clear(inputEmail);
  await userEvent.type(inputEmail, email);
  await userEvent.clear(inputPassword);
  await userEvent.type(inputPassword, password);
  await userEvent.click(btnLogin);

  expect(screen.getByTestId('divHome')).toBeInTheDocument();
});
