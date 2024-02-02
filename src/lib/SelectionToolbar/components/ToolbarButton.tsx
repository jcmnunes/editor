import React from 'react';
import styled from 'styled-components';
import { Icon } from '../../icons/Icon';
import { IconType } from '../../icons/icons';

interface StyledButtonProps {
  $isActive?: boolean;
}

export const StyledButton = styled.button<StyledButtonProps>(
  ({ theme }) => ({
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
  }),

  ({ $isActive, theme }) => {
    if ($isActive) {
      return {
        background: theme.colors.neutral600,

        '.darkTheme &': {
          background: theme.colors.neutral100,
        },
      };
    }
    return {};
  },
);

interface ToolbarButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  icon: IconType;
  isActive?: boolean;
}

export const ToolbarButton = ({ icon, isActive, ...rest }: ToolbarButtonProps) => {
  return (
    <StyledButton type="button" $isActive={isActive} {...rest}>
      <Icon icon={icon} size={18} />
    </StyledButton>
  );
};
