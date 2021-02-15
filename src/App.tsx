import '@binarycapsule/ui-capsules/assets/global.css';
import './styles.css';
import React from 'react';
import { theme, ThemeProvider } from '@binarycapsule/ui-capsules';
import { Main } from './App.styles';
import { BcEditor } from './components/BcEditor/BcEditor';
import { LandingHeader } from './components/LandingHeader/LandingHeader';

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Main>
        <LandingHeader />

        <BcEditor />
      </Main>
    </ThemeProvider>
  );
};
