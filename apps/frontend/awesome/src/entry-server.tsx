import React from 'react';
import { renderToString } from 'react-dom/server';

import App from './App';

export function render() {
  return renderToString(
    process.env.NODE_ENV === 'development' ? (
      <React.StrictMode>
        <App />
      </React.StrictMode>
    ) : (
      <App />
    ),
  );
}
