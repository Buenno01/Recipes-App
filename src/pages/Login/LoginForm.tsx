import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
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
    <div className="flex flex-col items-center w-full gap-4">
      <h1 className="text-primary-purple italic text-xl">
        Login
      </h1>
      <form className="flex flex-col items-center w-2/3 gap-2">
        <input
          className="border w-full rounded-sm h-8 border-primary-purple px-3
          placeholder:text-primary-purple text-primary-purple placeholder:font-thin"
          placeholder="Email"
          type="email"
          data-testid="email-input"
          onChange={ handleEmailChange }
          value={ email }
        />
        <input
          className="border w-full rounded-sm h-8 border-primary-purple px-3
          placeholder:text-primary-purple text-primary-purple placeholder:font-thin"
          placeholder="Password"
          type="password"
          data-testid="password-input"
          value={ password }
          onChange={ handlePasswordChange }
        />
        <button
          type="submit"
          className="bg-primary-yellow w-full h-8 rounded-md text-white font-bold"
          data-testid="login-submit-btn"
          disabled={ !formIsValid }
          onClick={ handleClick }
        >
          Enter
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
