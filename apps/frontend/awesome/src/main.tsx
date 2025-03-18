import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';
import './index.css';

const mode = import.meta.env.NODE_ENV;

createRoot(document.getElementById('root')!).render(
  mode === 'development' ? (
    <StrictMode>
      <App />
    </StrictMode>
  ) : (
    <App />
  ),
);
