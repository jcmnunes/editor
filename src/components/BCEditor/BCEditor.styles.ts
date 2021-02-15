import styled from '@emotion/styled';
import { Box } from '@binarycapsule/ui-capsules';

export const StyledBCEditor = styled.section`
  display: flex;
  flex-direction: column;
  margin: 0 48px;

  @media (min-width: 1000px) {
    width: 480px;
    margin: 0;
    height: 100%;
  }
`;

export const EditorWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  flex: 1,
  border: `1px solid ${theme.colors.neutral['200']}`,
  borderRadius: 4,
  overflow: 'hidden',

  '@media (min-width: 1000px)': {
    width: 480,
  },
}));
