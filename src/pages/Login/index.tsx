import { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event:any) => {
    setPassword(event.target.value);
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validEmail = emailRegex.test(email);

  const validPassword = password.length > 6;

  const formIsValid = (validEmail && validPassword);

  return (
    <div>
      <input
        type="email"
        data-testid="email-input"
        onChange={ handleEmailChange }
        value={ email }
      />
      <input
        type="password"
        data-testid="password-input"
        value={ password }
        onChange={ handlePasswordChange }
      />
      <button
        data-testid="login-submit-btn"
        disabled={ !formIsValid }
      >
        Enter
      </button>
    </div>
  );
}

export default Login;
