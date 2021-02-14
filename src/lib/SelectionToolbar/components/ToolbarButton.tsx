import React from 'react';
import styled from '@emotion/styled';
import { Icon } from '../../icons/Icon';
import { IconType } from '../../icons/icons';

export const StyledButton = styled.button<{ isActive?: boolean }>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  margin-left: 4px;
  border: none;
  background: ${({ isActive, theme }) => (isActive ? theme.colors.neutral['600'] : 'none')};
  transition: opacity 100ms ease-in-out 0s;
  padding: 0;
  border-radius: 2px;
  color: ${({ theme }) => theme.colors.neutral['100']};

  &:first-of-type {
    margin-left: 0;
  }

  &:focus {
    outline: none;
  }
`;

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
