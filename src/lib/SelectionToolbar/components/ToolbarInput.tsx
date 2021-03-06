import React, { forwardRef } from 'react';
import styled from '@emotion/styled';

export const StyledInput = styled.input(({ theme, width }) => ({
  height: 28,
  border: 'none',
  padding: '6px 8px',
  margin: '0px 4px 0px 0px',
  fontSize: theme.fontSizes.small,
  color: theme.colors.neutral['100'],
  fontWeight: 500,
  background: theme.colors.neutral['600'],
  borderRadius: '2px',
  width,

  '&:focus': {
    outline: 'none',
  },
}));

interface ToolbarInputProps extends React.ComponentPropsWithRef<'input'> {
  width: number;
}

export const ToolbarInput = forwardRef<HTMLInputElement, ToolbarInputProps>((props, ref) => {
  return <StyledInput ref={ref} {...props} />;
});
