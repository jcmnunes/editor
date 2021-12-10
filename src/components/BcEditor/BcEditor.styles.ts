import { styled, Box } from '@binarycapsule/ui-capsules';

export const StyledBcEditor = styled('section', {
  display: 'flex',
  flexDirection: 'column',
  margin: '0 48px',

  '@media (min-width: 1000px)': {
    width: 480,
    margin: 0,
    height: '100%',
  },
});

export const EditorWrapper = styled(Box, {
  width: '100%',
  height: '100%',
  flex: 1,
  border: `1px solid $neutral200`,
  borderRadius: 4,
  overflow: 'hidden',

  '@media (min-width: 1000px)': {
    width: 480,
  },
});
