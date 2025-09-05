import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css'

import Auth0ProviderWithNavigate from './components/Auth0ProviderWithNavigate.jsx';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
        <Auth0ProviderWithNavigate>
            <App />
        </Auth0ProviderWithNavigate>
      </BrowserRouter>
  </StrictMode>,
)
