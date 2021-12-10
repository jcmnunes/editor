import './styles.css';
import React from 'react';
import { globalCss } from '@stitches/react';
import { Main } from './App.styles';
import { Box, darkTheme, IconButton, useTheme } from '@binarycapsule/ui-capsules';
import { BcEditor } from './components/BcEditor/BcEditor';
import { LandingHeader } from './components/LandingHeader/LandingHeader';

const globalStyles = globalCss({
  body: {
    color: '$neutral700',
    background: '$neutral100',

    [`&.${darkTheme}`]: {
      background: '$neutral100',
    },
  },
});

export const App = () => {
  globalStyles();

  const { isDark, setTheme } = useTheme();

  return (
    <Main>
      <Box css={{ position: 'absolute', top: '$4', right: '$4' }}>
        <IconButton
          icon={isDark ? 'moon' : 'sun'}
          variant="ghostGray"
          onClick={() => setTheme(isDark ? 'light' : 'dark')}
          aria-label="Change theme"
        />
      </Box>

      <LandingHeader />

      <BcEditor />
    </Main>
  );
};
