import React, { forwardRef } from 'react';
import styled from 'styled-components';

export const StyledInput = styled.input(({ theme }) => ({
  height: 28,
  border: 'none',
  padding: '6px 8px',
  margin: '0px 4px 0px 0px',
  fontSize: '$sm',
  color: theme.colors.neutral100,
  fontWeight: 500,
  background: theme.colors.neutral600,
  borderRadius: '2px',
  width: 240,

  '.darkTheme &': {
    background: theme.colors.neutral200,
    color: theme.colors.neutral700,
  },

  '&:focus': {
    outline: 'none',
  },
}));

interface ToolbarInputProps extends React.ComponentPropsWithRef<'input'> {}

export const ToolbarInput = forwardRef<HTMLInputElement, ToolbarInputProps>((props, ref) => {
  return <StyledInput ref={ref} {...props} />;
});

ToolbarInput.displayName = 'ToolbarInput';
