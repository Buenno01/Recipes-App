import { useNavigate } from 'react-router-dom';
import TopMenu from '../../components/TopMenu';
import searchIconSrc from '../../assets/images/searchIcon.svg';
import profileIconSrc from '../../assets/images/profileIconHeader.svg';
import Button from '../../components/atoms/Button';
import HeaderLogo from './HeaderLogo';

type HeaderMenuProps = {
  searchIcon: boolean;
  toggleSearchBarVisibility: () => void;
};

function HeaderMenu({ searchIcon, toggleSearchBarVisibility }: HeaderMenuProps) {
  const navigate = useNavigate();
  return (
    <TopMenu.Wrapper className="h-14 justify-between px-6 bg-secondary-yellow">
      <HeaderLogo />
      <TopMenu.Wrapper className="gap-2">
        {searchIcon && (
          <Button
            imgSrc={ searchIconSrc }
            testId="search-top-btn"
            onClick={ toggleSearchBarVisibility }
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
