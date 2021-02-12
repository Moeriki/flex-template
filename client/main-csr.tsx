import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import { App } from './app';

import './index.css';

ReactDOM.hydrate(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root'),
);
