import React from 'react';
import styled from '@emotion/styled';
import { Bold } from '../icons/bold';
import { Italic } from '../icons/italic';
import { InlineCode } from '../icons/inlineCode';

export const StyledButton = styled.button<{ isActive: boolean }>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  margin-left: 4px;
  border: none;
  background: ${({ isActive, theme }) => (isActive ? theme.colors.neutral['100'] : 'none')};
  transition: opacity 100ms ease-in-out 0s;
  padding: 0;
  border-radius: 2px;

  &:first-of-type {
    margin-left: 0;
  }
`;

const iconMap = {
  bold: Bold,
  italic: Italic,
  inlineCode: InlineCode,
};

export type ToolbarIcon = 'bold' | 'italic' | 'inlineCode';

interface Props extends React.ComponentPropsWithoutRef<'button'> {
  icon: ToolbarIcon;
  isActive: boolean;
}

export const ToolbarButton: React.FC<Props> = ({ icon, ...rest }) => {
  const Icon = iconMap[icon];

  return (
    <StyledButton type="button" {...rest}>
      <Icon />
    </StyledButton>
  );
};
