import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import ContextWrapper from './context/ContextWrapper';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ContextWrapper>
      <App />
    </ContextWrapper>
  </React.StrictMode>
);
