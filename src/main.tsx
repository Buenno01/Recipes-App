import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import RecipesProvider from './contexts/RecipesContext/RecipesProvider';
// import CombinedProviders from './contexts/CombinedProviders';

ReactDOM
  .createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <RecipesProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RecipesProvider>,
  );
