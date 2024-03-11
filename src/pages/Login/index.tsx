import logo from '../../assets/images/logoRecipesAppLarge.svg';
import tomato from '../../assets/images/tomates.png';
import LoginForm from './LoginForm';

function Login() {
  return (
    <div className="h-screen w-screen relative">
      <span
        className="absolute flex flex-col justify-between items-center
       z-10 h-screen w-screen py-7"
      >
        <img className="w-48" src={ logo } alt="Recipes App" />
        <LoginForm />
      </span>
      <div className="absolute w-screen h-1/2 bg-primary-purple top-0 z-0">
        <img className="absolute top-28" src={ tomato } alt="Tomatoes" />
      </div>
    </div>
  );
}

export default Login;
