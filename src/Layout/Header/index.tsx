import { useState } from 'react';
import SearchBar from '../SearchBar';
import TopMenu from '../../components/TopMenu';
import HeaderMenu from './HeaderMenu';
import HeaderTitle from './HeaderTitle';

interface HeaderProps {
  searchIcon: boolean;
}

function Header({ searchIcon }:
HeaderProps) {
  const [searchBarVisibility, setSearchBarVisibility] = useState(false);

  return (
    <TopMenu.Root>
      <HeaderMenu
        searchIcon={ searchIcon }
        toggleSearchBarVisibility={ () => setSearchBarVisibility(!searchBarVisibility) }
      />
      <HeaderTitle />

      {searchBarVisibility && (
        <SearchBar />

      )}
    </TopMenu.Root>
  );
}

export default Header;
