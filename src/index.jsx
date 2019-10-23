import '@binarycapsule/ui-capsules/assets/global.css';
import 'focus-visible/dist/focus-visible';
import { theme } from '@binarycapsule/ui-capsules';
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import App from './App';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root'),
);
