import React from 'react';
import styled from '@emotion/styled';
import { Bold } from '../icons/bold';
import { Italic } from '../icons/italic';
import { InlineCode } from '../icons/inlineCode';
import { Strikethrough } from '../icons/strikethrough';
import { H1 } from '../icons/h1';
import { H2 } from '../icons/h2';
import { H3 } from '../icons/h3';
import { Code } from '../icons/code';
import { BlockQuote } from '../icons/blockQuote';
import { BulletList } from '../icons/bulletList';
import { OrderedList } from '../icons/orderedList';
import { ExternalLink } from '../icons/externalLink';
import { TrashCan } from '../icons/trashCan';
import { TodoList } from '../icons/todoList';
import { Link } from '../icons/link';

export const StyledButton = styled.button<{ isActive?: boolean }>`
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

  &:disabled {
    opacity: 0.5;
  }
`;

const iconMap = {
  bold: Bold,
  italic: Italic,
  inlineCode: InlineCode,
  strikethrough: Strikethrough,
  h1: H1,
  h2: H2,
  h3: H3,
  code: Code,
  blockquote: BlockQuote,
  bulletList: BulletList,
  orderedList: OrderedList,
  externalLink: ExternalLink,
  trashCan: TrashCan,
  todoList: TodoList,
  link: Link,
};

export type ToolbarIcon =
  | 'bold'
  | 'italic'
  | 'inlineCode'
  | 'strikethrough'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'code'
  | 'blockquote'
  | 'bulletList'
  | 'orderedList'
  | 'externalLink'
  | 'trashCan'
  | 'todoList'
  | 'link';

interface ToolbarButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  icon: ToolbarIcon;
  isActive?: boolean;
}

export const ToolbarButton: React.FC<ToolbarButtonProps> = ({ icon, ...rest }) => {
  const Icon = iconMap[icon];

  return (
    <StyledButton type="button" {...rest}>
      <Icon />
    </StyledButton>
  );
};
