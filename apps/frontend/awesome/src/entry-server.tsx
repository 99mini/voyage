import React from 'react';
import { renderToString } from 'react-dom/server';

import App from './App';

// NODE_ENV 값이 없을 경우를 대비해 기본값 설정
const isDevelopment = import.meta.env ? import.meta.env.MODE === 'development' || import.meta.env.DEV : false;

export function render() {
  return renderToString(
    isDevelopment ? (
      <React.StrictMode>
        <App />
      </React.StrictMode>
    ) : (
      <App />
    ),
  );
}
