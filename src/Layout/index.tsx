import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function Layout() {
  const { pathname } = useLocation();
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [searchIcon, setSearchIcon] = useState(false);

  const DETAILS_MEALS = /^\/meals\/\d+\/?$/;
  const DETAILS_DRINKS = /^\/drinks\/\d+\/?$/;
  const IN_PROGRESS = /in-progress/i;
  const PROFILE = /profile/i;
  const DONE_RECIPES = /done-recipes/i;
  const FAVORITE_RECIPES = /favorite-recipes/i;
  const MEALS = /^\/meals\/?$/;
  const DRINKS = /^\/drinks\/?$/;
  const ROOT = /^\/$/;

  useEffect(() => {
    switch (true) {
      case DETAILS_MEALS.test(pathname):
      case DETAILS_DRINKS.test(pathname):
      case IN_PROGRESS.test(pathname):
      case ROOT.test(pathname):
        setIsHeaderVisible(false);
        setIsFooterVisible(false);
        break;
      case PROFILE.test(pathname):
        setIsHeaderVisible(true);
        setIsFooterVisible(true);
        setSearchIcon(false);
        break;
      case DONE_RECIPES.test(pathname):
      case FAVORITE_RECIPES.test(pathname):
        setIsHeaderVisible(true);
        setIsFooterVisible(false);
        setSearchIcon(false);
        break;
      case MEALS.test(pathname):
      case DRINKS.test(pathname):
        setIsHeaderVisible(true);
        setIsFooterVisible(true);
        setSearchIcon(true);
        break;
      default:
        break;
    }
  }, [pathname]);

  return (
    <>
      {isHeaderVisible && (
        <Header
          searchIcon={ searchIcon }
        />
      )}
      <Outlet />
      <div className="w-full h-16" />

      {isFooterVisible && (
        <Footer />
      )}
    </>
  );
}

export default Layout;
