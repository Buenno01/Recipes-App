import React from 'react';
import HeaderProps from '../@types/HeaderType';

function Header({ titlePage, profileIcon, searchIcon }: HeaderProps) {
  return (
    <header>
      { profileIcon && <img
        src="/src/images/profileIcon.svg"
        alt=""
        data-testid="profile-top-btn"
      />}

      <p data-testid="page-title">
        {titlePage}
      </p>

      { searchIcon && <img
        src="src/images/searchIcon.svg"
        alt=""
        data-testid="search-top-btn"
      />}

    </header>
  );
}

export default Header;
