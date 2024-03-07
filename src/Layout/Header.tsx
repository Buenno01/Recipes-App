import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderProps from '../@types/HeaderType';
import SearchBar from './SearchBar';

function Header({ titlePage, profileIcon, searchIcon }:
HeaderProps) {
  const navigate = useNavigate();
  const [isSearchVisible, setisSearchVisible] = useState(false);

  return (
    <header data-testid="header-layout">
      {
     profileIcon
       && (
         <button
           onClick={ () => navigate('/profile') }
         >

           <img
             src="/src/assets/images/profileIcon.svg"
             alt=""
             data-testid="profile-top-btn"
           />
         </button>
       )

      }

      <p data-testid="page-title">{titlePage}</p>

      {searchIcon && (
        <button
          onClick={ () => setisSearchVisible(!isSearchVisible) }
        >
          <img
            src="src/assets/images/searchIcon.svg"
            alt=""
            data-testid="search-top-btn"

          />
        </button>
      )}

      {isSearchVisible && (
        <SearchBar />

      )}
    </header>
  );
}

export default Header;
