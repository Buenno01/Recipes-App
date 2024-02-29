import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import DoneRecipesProvider from './providers/DoneRecipeProvider';

ReactDOM
  .createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <DoneRecipesProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DoneRecipesProvider>,
  );
