import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import getPageTitle from '../utils/getPageTitle';

// Rota "/": não tem header.
// Rota "/meals": tem o header com o título "Meals" e os ícones de perfil e pesquisa.
// Rota "/drinks": tem o header com o título "Drinks" e os ícones de perfil e pesquisa.
// Rota "/meals/:id": não tem header.
// Rota "/drinks/:id": não tem header.
// Rota "/meals/:id/in-progress": não tem header.
// Rota "/drinks/:id/in-progress": não tem header.
// Rota "/profile": tem o header com o título "Profile" e o ícone de perfil, mas sem o ícone de pesquisa.
// Rota "/done-recipes": tem o header com o título "Done Recipes" e o ícone de perfil, mas sem o ícone de pesquisa.
// Rota "/favorite-recipes": tem o header com o título "Favorite Recipes" e o ícone de perfil, mas sem o ícone de pesquisa.

// Rota "/": não deve ter footer.
// Rota "/meals": deve ter footer.
// Rota "/drinks": deve ter footer.
// Rota "/meals/:id": não deve ter footer.
// Rota "/drinks/:id": não deve ter footer.
// Rota "/meals/:id/in-progress": não deve ter footer.
// Rota "/drinks/:id/in-progress": não deve ter footer.
// Rota "/profile": deve ter footer.
// Rota "/done-recipes": não deve ter footer.
// Rota "/favorite-recipes": não deve ter footer.

function Layout() {
  const { pathname } = useLocation();
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [titlePage, setTitlePage] = useState('');
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
    setTitlePage(getPageTitle(pathname));
  }, [pathname]);

  return (
    <>
      {isHeaderVisible && (
        <Header
          titlePage={ titlePage }
          profileIcon
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
