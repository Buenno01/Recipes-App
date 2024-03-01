import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Header from './Header';

function Layout() {
  const location = useLocation();
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [titlePage, setTitlePage] = useState('');
  const [profileIcon, setProfileIcon] = useState(false);
  const [searchIcon, setSeachIcon] = useState(false);

  useEffect(() => {
    switch (location.pathname) {
      case '/':
        setIsHeaderVisible(false);
        break;
      case '/meals':
        setIsHeaderVisible(true);
        setSeachIcon(true);
        setProfileIcon(true);
        setTitlePage('Meals');
        break;
      default:
        break;
    }
  }, [location.pathname]);

  return (
    <>
      {isHeaderVisible && <Header
        titlePage={ titlePage }
        profileIcon={ profileIcon }
        searchIcon={ searchIcon }
      />}
      <Outlet />
    </>
  );
}

export default Layout;
