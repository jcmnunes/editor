import React, { forwardRef } from 'react';
import { styled } from '@binarycapsule/ui-capsules';

export const StyledInput = styled('input', {
  height: 28,
  border: 'none',
  padding: '6px 8px',
  margin: '0px 4px 0px 0px',
  fontSize: '$1',
  color: '$neutral100',
  fontWeight: 500,
  background: '$neutral600',
  borderRadius: '2px',
  width: 240,

  '&:focus': {
    outline: 'none',
  },
});

interface ToolbarInputProps extends React.ComponentPropsWithRef<'input'> {}

export const ToolbarInput = forwardRef<HTMLInputElement, ToolbarInputProps>((props, ref) => {
  return <StyledInput ref={ref} {...props} />;
});
