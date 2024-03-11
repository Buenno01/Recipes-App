import logoSmall from '../../assets/images/logoRecipesAppSmall.svg';
import logoText from '../../assets/images/logoRecipesAppTextOnly.svg';
import TopMenu from '../../components/TopMenu';

function HeaderLogo() {
  return (
    <TopMenu.Wrapper className="gap-2 items-center">
      <img className="w-10" src={ logoSmall } alt="Logo" />
      <img className="h-6" src={ logoText } alt="Recipes App" />
    </TopMenu.Wrapper>
  );
}

export default HeaderLogo;
