import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

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

  const user = { email };
  const userData = JSON.stringify(user);

  const handleClick = () => {
    localStorage.setItem('user', userData);
    navigate('/meals');
  };

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
        type="submit"
        data-testid="login-submit-btn"
        disabled={ !formIsValid }
        onClick={ handleClick }
      >
        Enter
      </button>
    </div>
  );
}

export default Login;
