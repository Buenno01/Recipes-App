import { useNavigate } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const navigate = useNavigate();

  return (
    <footer data-testid="footer" className="footer">
      <button data-testid="btn-drinks" onClick={ () => navigate('/drinks') }>
        <img data-testid="drinks-bottom-btn" src="src/images/drinkIcon.svg" alt="" />
      </button>
      <button data-testid="btn-meals" onClick={ () => navigate('/meals') }>
        <img data-testid="meals-bottom-btn" src="src/images/mealIcon.svg" alt="" />
      </button>
    </footer>
  );
}

export default Footer;
