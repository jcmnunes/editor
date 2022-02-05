import React from 'react';
import { darkTheme, styled } from '@binarycapsule/ui-capsules';
import { Icon } from '../../icons/Icon';
import { IconType } from '../../icons/icons';

export const StyledButton = styled('button', {
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
  color: '$neutral100',

  [`.${darkTheme} &`]: {
    color: '$neutral700',
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
        background: '$neutral600',

        [`.${darkTheme} &`]: {
          background: '$neutral200',
        },
      },
    },
  },
});

interface ToolbarButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  icon: IconType;
  isActive?: boolean;
}

export const ToolbarButton: React.FC<ToolbarButtonProps> = ({ icon, ...rest }) => {
  return (
    <StyledButton type="button" {...rest}>
      <Icon icon={icon} size={18} />
    </StyledButton>
  );
};
