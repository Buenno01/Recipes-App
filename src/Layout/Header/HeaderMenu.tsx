import { useNavigate } from 'react-router-dom';
import TopMenu from '../../components/TopMenu';
import profileIconSrc from '../../assets/images/profileIconHeader.svg';
import Button from '../../components/atoms/Button';
import HeaderLogo from './HeaderLogo';
import SearchButton from './SearchButton';

type HeaderMenuProps = {
  searchIcon: boolean;
  toggleSearchBarVisibility: () => void;
  setSearchBarVisibility: (arg: boolean) => void;
};

function HeaderMenu({ searchIcon, toggleSearchBarVisibility, setSearchBarVisibility }:
HeaderMenuProps) {
  const navigate = useNavigate();
  return (
    <TopMenu.Wrapper className="h-14 justify-between px-6 bg-secondary-yellow">
      <HeaderLogo />
      <TopMenu.Wrapper className="gap-2">
        {searchIcon && (
          <SearchButton
            toggleSearchBarVisibility={ toggleSearchBarVisibility }
            setSearchBarVisibility={ setSearchBarVisibility }
          />
        )}
        <Button
          onClick={ () => navigate('/profile') }
          imgSrc={ profileIconSrc }
          testId="profile-top-btn"
        />
      </TopMenu.Wrapper>
    </TopMenu.Wrapper>
  );
}

export default HeaderMenu;
