import { useNavigate } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate();

  return (
    <footer
      data-testid="footer"
      className="flex justify-around fixed bottom-0 bg-slate-800 w-full"
    >
      <button data-testid="btn-drinks" onClick={ () => navigate('/drinks') }>
        <img
          data-testid="drinks-bottom-btn"
          src="src/assets/images/drinkIcon.svg"
          alt=""
        />
      </button>
      <button data-testid="btn-meals" onClick={ () => navigate('/meals') }>
        <img
          data-testid="meals-bottom-btn"
          src="src/assets/images/mealIcon.svg"
          alt=""
        />
      </button>
    </footer>
  );
}

export default Footer;
