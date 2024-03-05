import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderProps from '../@types/HeaderType';

function Header({ titlePage, profileIcon, searchIcon, onSearchClick, isSearchVisible }:
HeaderProps) {
  const navigate = useNavigate();

  return (
    <header data-testid="header-layout">
      {
     profileIcon
       && (
         <button
           onClick={ () => navigate('/profile') }
         >

           <img
             src="/src/images/profileIcon.svg"
             alt=""
             data-testid="profile-top-btn"
           />
         </button>
       )

      }

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
