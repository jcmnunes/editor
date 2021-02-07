import React from 'react';
import ReactDOM from 'react-dom';
import { EditorView } from 'prosemirror-view';
import styled from '@emotion/styled';
import { toggleMark } from 'prosemirror-commands';
import { usePosition } from './hooks/usePosition';
import { ToolbarButton } from './components/ToolbarButton';
import { isMarkActive } from '../utils/isMarkActive';
import { Separator } from './components/Separator';
import { isNodeActive } from '../utils/isNodeActive';
import { toggleBlockType } from '../utils/toggleBlockType';

export const Wrapper = styled.div<{
  active?: boolean;
  offset: number;
}>`
  position: absolute;
  height: 38px;
  opacity: 0;
  border-radius: 4px;
  z-index: ${props => props.theme.zIndices.larger};
  background-color: ${props => props.theme.colors.bg};
  box-sizing: border-box;
  pointer-events: none;
  white-space: nowrap;
  box-shadow: 0 3px 6px hsla(0, 0%, 0%, 0.15), 0 2px 4px hsla(0, 0%, 0%, 0.12);

  ${({ active }) =>
    active &&
    `
    transform: translateY(-8px) scale(1);
    pointer-events: all;
    opacity: 1;
  `};

  @media print {
    display: none;
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 8px;
`;

interface Props {
  view?: EditorView;
}

export const SelectionToolbar: React.FC<Props> = ({ view }) => {
  const [ref, { left, top, offset }] = usePosition({ view, isSelectingText: false, active: true });

  if (!view) {
    return null;
  }

  return ReactDOM.createPortal(
    <Wrapper
      ref={ref as any}
      offset={offset}
      active={!view.state.selection.empty}
      style={{
        top: `${top}px`,
        left: `${left}px`,
      }}
    >
      <Container>
        <ToolbarButton
          icon="bold"
          isActive={isMarkActive(view.state, view.state.schema.marks.strong)}
          onClick={() => toggleMark(view.state.schema.marks.strong)(view.state, view?.dispatch)}
        />

        <ToolbarButton
          icon="italic"
          isActive={isMarkActive(view.state, view.state.schema.marks.em)}
          onClick={() => toggleMark(view.state.schema.marks.em)(view.state, view?.dispatch)}
        />

        <ToolbarButton
          icon="strikethrough"
          isActive={isMarkActive(view.state, view.state.schema.marks.strikethrough)}
          onClick={() =>
            toggleMark(view.state.schema.marks.strikethrough)(view.state, view?.dispatch)
          }
        />

        <ToolbarButton
          icon="inlineCode"
          isActive={isMarkActive(view.state, view.state.schema.marks.code)}
          onClick={() => toggleMark(view.state.schema.marks.code)(view.state, view?.dispatch)}
        />

        <Separator />

        <ToolbarButton
          icon="h1"
          isActive={isNodeActive(view.state.schema.nodes.heading, view.state, { level: 1 })}
          onClick={() => toggleBlockType(view.state.schema.nodes.heading, view, { level: 1 })}
        />

        <ToolbarButton
          icon="h2"
          isActive={isNodeActive(view.state.schema.nodes.heading, view.state, { level: 2 })}
          onClick={() => toggleBlockType(view.state.schema.nodes.heading, view, { level: 2 })}
        />

        <ToolbarButton
          icon="h3"
          isActive={isNodeActive(view.state.schema.nodes.heading, view.state, { level: 3 })}
          onClick={() => toggleBlockType(view.state.schema.nodes.heading, view, { level: 3 })}
        />
      </Container>
    </Wrapper>,
    document.body,
  );
};
