import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';

test('Input de email, senha e botão está presente no documento', () => {
  render(<Login />);
  const inputEmail = screen.getByTestId('email-input');
  const inputPassword = screen.getByTestId('password-input');
  const btnLogin = screen.getByTestId('login-submit-btn');
  expect(inputEmail).toBeInTheDocument();
  expect(inputPassword).toBeInTheDocument();
  expect(btnLogin).toBeInTheDocument();
});

test('Verifica caso o email tenha um formato diferente ou senha tenha 6 ou menos caractes, o botão tenha a propriedade "disabled"', async () => {
  render(<Login />);
  const inputEmail = screen.getByTestId('email-input');
  const inputPassword = screen.getByTestId('password-input');
  const btnLogin = screen.getByTestId('login-submit-btn');

  expect(btnLogin).toBeDisabled();

  await userEvent.type(inputEmail, 'emailInvalido');
  await userEvent.type(inputPassword, '12345');
  expect(btnLogin).toBeDisabled();

  await userEvent.clear(inputEmail);
  await userEvent.type(inputEmail, 'emailvalido@valid.com');
  await userEvent.clear(inputPassword);
  await userEvent.type(inputPassword, '12345');
  expect(btnLogin).toBeDisabled();

  await userEvent.clear(inputEmail);
  await userEvent.type(inputEmail, 'emailInvalido');
  await userEvent.clear(inputPassword);
  await userEvent.type(inputPassword, '123456');
  expect(btnLogin).toBeDisabled();

  await userEvent.clear(inputEmail);
  await userEvent.type(inputEmail, 'emailvalido@valid.com');
  await userEvent.clear(inputPassword);
  await userEvent.type(inputPassword, '12345678');
  expect(btnLogin).toBeEnabled();
});
