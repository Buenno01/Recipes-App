import React from 'react';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <>
      <header>Layout Header</header>
      <Outlet />
      <footer>Layout Footer</footer>
    </>
  );
}

export default Layout;
