import { render, screen } from '@testing-library/react';
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
