import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderProps from '../@types/HeaderType';

function Header({ titlePage, profileIcon, searchIcon }: HeaderProps) {
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
