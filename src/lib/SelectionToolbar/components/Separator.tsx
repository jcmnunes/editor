import styled from 'styled-components';

export const Separator = styled.div(({ theme }) => ({
  height: 16,
  borderLeft: `1px solid ${theme.colors.neutral300}`,
  display: 'inline-block',
  margin: '0 2px 0 7px',
}));
