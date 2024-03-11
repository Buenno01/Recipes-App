import { Link } from 'react-router-dom';
import logoSmall from '../../assets/images/logoRecipesAppSmall.svg';
import logoText from '../../assets/images/logoRecipesAppTextOnly.svg';
import TopMenu from '../../components/TopMenu';

function HeaderLogo() {
  return (
    <TopMenu.Wrapper>
      <Link to="/meals" className="flex gap-2 items-center">
        <img className="w-10" src={ logoSmall } alt="Logo" />
        <img className="h-6" src={ logoText } alt="Recipes App" />
      </Link>
    </TopMenu.Wrapper>
  );
}

export default HeaderLogo;
