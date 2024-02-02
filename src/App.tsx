import './styles.css';
import React from 'react';
import { Box, IconButton, useUiCapsContext } from '@binarycapsule/ui-capsules';
import { Main } from './App.styles';
import { BcEditor } from './components/BcEditor/BcEditor';
import { LandingHeader } from './components/LandingHeader/LandingHeader';

export const App = () => {
  const { isDarkTheme, setTheme } = useUiCapsContext();

  return (
    <Main>
      <Box style={{ position: 'absolute', top: 16, right: 16 }}>
        <IconButton
          icon={isDarkTheme ? 'moon' : 'sun'}
          variant="ghostGray"
          onClick={() => setTheme(isDarkTheme ? 'light' : 'dark')}
          aria-label="Change theme"
        />
      </Box>

      <LandingHeader />

      <BcEditor />
    </Main>
  );
};
