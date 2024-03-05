import React from 'react';
import HeaderProps from '../@types/HeaderType';

function Header({ titlePage, profileIcon, searchIcon, onSearchClick, isSearchVisible }:
HeaderProps) {
  return (
    <header data-testid="header-layout">
      {profileIcon && (
        <img
          src="/src/images/profileIcon.svg"
          alt=""
          data-testid="profile-top-btn"
        />
      )}

      <p data-testid="page-title">{titlePage}</p>

      {searchIcon && (
        <button
          onClick={ onSearchClick }
        >
          <img
            src="src/images/searchIcon.svg"
            alt=""
            data-testid="search-top-btn"

          />
        </button>
      )}

      {isSearchVisible && (
        <input
          type="text"
          placeholder="Search..."
          data-testid="search-input"
        />
      )}
    </header>
  );
}

export default Header;
