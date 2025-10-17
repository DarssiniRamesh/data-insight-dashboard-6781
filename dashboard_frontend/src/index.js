import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Accessibility: allow skip to main if needed
window.addEventListener('hashchange', () => {
  if (window.location.hash === '#main-content') {
    const el = document.getElementById('main-content');
    if (el) el.focus();
  }
});
