import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';

function Layout() {
  const location = useLocation();
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  // const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [titlePage, setTitlePage] = useState('');
  const [profileIcon, setProfileIcon] = useState(false);
  const [searchIcon, setSeachIcon] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  useEffect(() => {
    switch (location.pathname) {
      case '/':
        setIsHeaderVisible(false);
        break;
      case '/meals':
        setIsHeaderVisible(true); setSeachIcon(true); setProfileIcon(true);
        setTitlePage('Meals');
        break;
      case '/drinks':
      case '/drinks/':
        setIsHeaderVisible(true); setSeachIcon(true); setProfileIcon(true);
        setTitlePage('Drinks');
        break;
      case '/meals/:id':
        setIsHeaderVisible(false);
        break;
      case '/drinks/:id':
        setIsHeaderVisible(false);
        break;
      case '/meals/:id/in-progress':
        setIsHeaderVisible(false);
        break;
      case '/drinks/:id/in-progress':
        setIsHeaderVisible(false);
        break;
      case '/profile':
        setIsHeaderVisible(true);
        setProfileIcon(true);
        setTitlePage('Profile');
        break;
      case '/done-recipes':
        setIsHeaderVisible(true);
        setProfileIcon(true);
        setTitlePage('Done Recipes');
        break;
      case '/favorite-recipes':
        setIsHeaderVisible(true);
        setProfileIcon(true);
        setTitlePage('Favorite Recipes');
        break;
      default:
        break;
    }
  }, [location.pathname]);

  const toggleSearchVisibility = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <>
      {isHeaderVisible && (
        <Header
          titlePage={ titlePage }
          profileIcon={ profileIcon }
          searchIcon={ searchIcon }
          onSearchClick={ toggleSearchVisibility }
          isSearchVisible={ isSearchVisible }
        />
      )}
      <Outlet />
    </>
  );
}

export default Layout;
