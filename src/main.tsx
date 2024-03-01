import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import DoneRecipesProvider from './providers/DoneRecipeProvider';
import CombinedProviders from './contexts/CombinedProviders';

ReactDOM
  .createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <CombinedProviders>
      <DoneRecipesProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </DoneRecipesProvider>
    </CombinedProviders>,
  );
