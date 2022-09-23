import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from 'react-router-dom';

import { BudgetsProvider } from "./contexts/BudgetsContext";
import Auth0ProviderWithHistory from './auth/Auth0ProviderWithHistory';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Auth0ProviderWithHistory>
        <BudgetsProvider>
          <App />
        </BudgetsProvider>
      </Auth0ProviderWithHistory>
    </Router>

  </React.StrictMode>
);

