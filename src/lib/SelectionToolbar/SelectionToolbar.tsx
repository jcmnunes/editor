import React from 'react';
import ReactDOM from 'react-dom';
import { EditorView } from 'prosemirror-view';
import styled from '@emotion/styled';
import { usePosition } from './hooks/usePosition';
import { isMarkActive } from '../utils/isMarkActive';
import { isNodeActive } from '../utils/isNodeActive';
import { FormattingToolbar } from './components/FormattingToolbar';
import { LinkToolbar } from './components/LinkToolbar';
import { getMarkRange } from '../utils/getMarkRange';

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
    pointer-events: all;
    opacity: 1;
  `};

  @media print {
    display: none;
  }
`;

interface Props {
  view?: EditorView;
}

export const SelectionToolbar: React.FC<Props> = ({ view }) => {
  const [ref, { left, top, offset }] = usePosition({ view, isSelectingText: false, active: true });

  if (!view) {
    return null;
  }

  const { state } = view;

  const {
    schema: { nodes, marks },
    selection,
  } = state;

  const isCodeSelection = isNodeActive(nodes.code_block, state);

  const link = isMarkActive(state, marks.link);

  const range = getMarkRange(state.selection.$from, marks.link);

  // Toolbar should not be visible in code blocks
  if (isCodeSelection) {
    return null;
  }

  return ReactDOM.createPortal(
    <Wrapper
      ref={ref as any}
      offset={offset}
      active={!selection.empty}
      style={{
        top: `${top}px`,
        left: `${left}px`,
      }}
    >
      {link && range ? (
        <LinkToolbar view={view} mark={range.mark} from={range.from} to={range.to} />
      ) : (
        <FormattingToolbar view={view} />
      )}
    </Wrapper>,
    document.body,
  );
};
