import { styled } from '@binarycapsule/ui-capsules';

export const Main = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  padding: '48px 0',
  margin: '0 auto',
  width: '100%',

  '@media (min-width: 1000px)': {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 850,
    height: '100vh',
  },
});
