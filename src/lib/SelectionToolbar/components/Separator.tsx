import React from 'react';
import styled from '@emotion/styled';

export const StyledSeparator = styled.div`
  height: 16px;
  border-left: 1px solid ${({ theme }) => theme.colors.neutral['300']};
  display: inline-block;
  margin: 0 2px 0 7px;
`;

export const Separator: React.FC = () => {
  return <StyledSeparator />;
};
