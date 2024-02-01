import React from 'react';
import styled from 'styled-components';
import { Icon } from '../../icons/Icon';
import { IconType } from '../../icons/icons';

export const StyledButton = styled.button(({ theme }) => ({
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 28,
  height: 28,
  marginLeft: 4,
  border: 'none',
  background: 'none',
  transition: 'opacity 100ms ease-in-out 0s',
  padding: 0,
  borderRadius: '2px',
  color: theme.colors.neutral100,

  '.darkTheme &': {
    color: theme.colors.neutral700,
  },

  '&:first-of-type': {
    marginLeft: 0,
  },

  '&:focus': {
    outline: 'none',
  },

  variants: {
    isActive: {
      true: {
        background: theme.colors.neutral600,

        '.darkTheme &': {
          background: theme.colors.neutral100,
        },
      },
    },
  },
}));

interface ToolbarButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  icon: IconType;
  isActive?: boolean;
}

export const ToolbarButton = ({ icon, ...rest }: ToolbarButtonProps) => {
  return (
    <StyledButton type="button" {...rest}>
      <Icon icon={icon} size={18} />
    </StyledButton>
  );
};
