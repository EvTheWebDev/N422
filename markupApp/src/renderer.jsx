import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app.jsx'; 

// Find the 'root' div in index.html
const container = document.getElementById('root');

// Create the React root and render the App
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);