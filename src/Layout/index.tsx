import React from 'react';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <>
      <header>
        <img
          src="/src/images/profileIcon.svg"
          alt=""
          data-testid="profile-top-btn"
        />

        <img src="src/images/searchIcon.svg" alt="" data-testid="search-top-btn" />
      </header>
      <Outlet />
      <footer>Layout Footer</footer>
    </>
  );
}

export default Layout;
