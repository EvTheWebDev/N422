import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app.jsx'; 

// Find root element
const container = document.getElementById('root');

// Create React Root
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);