import React from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';
import { UiCaps } from '@binarycapsule/ui-capsules';
import { App } from './App';

const GlobalStyle = createGlobalStyle`
  body {
    color: ${({ theme }) => theme.colors.neutral700};
    background: ${({ theme }) => theme.colors.neutral100} !important;
    width: 100%;
    height: 100%;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <UiCaps>
      <GlobalStyle />

      <App />
    </UiCaps>
  </React.StrictMode>,
  document.getElementById('root'),
);
