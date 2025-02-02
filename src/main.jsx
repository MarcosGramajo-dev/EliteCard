import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
 
import { ThemeProvider } from "@material-tailwind/react";

const root = createRoot(document.getElementById('root'));

root.render(
<Auth0Provider
    domain={import.meta.env.VITE_AUTH0_DOMAIN}
    clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <ThemeProvider>
      <App />
    </ThemeProvider>
</Auth0Provider>,
);