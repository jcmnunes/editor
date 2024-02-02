import React from 'react';
import ReactDOM from 'react-dom';
import { EditorView } from 'prosemirror-view';
import styled from 'styled-components';
import { usePosition } from './hooks/usePosition';
import { isMarkActive } from '../utils/isMarkActive';
import { isNodeActive } from '../utils/isNodeActive';
import { FormattingToolbar } from './components/FormattingToolbar';
import { LinkToolbar } from './components/LinkToolbar';
import { getMarkRange } from '../utils/getMarkRange';

interface WrapperProps {
  $isActive: boolean;
}

export const Wrapper = styled.div<WrapperProps>(
  ({ theme }) => ({
    position: 'absolute',
    height: 38,
    opacity: 0,
    borderRadius: 4,
    zIndex: theme.zIndices.splash,
    backgroundColor: theme.colors.neutral700,
    boxSizing: 'border-box',
    pointerEvents: 'none',
    whiteSpace: 'nowrap',
    boxShadow: theme.shadows['300'],

    '.darkTheme &': {
      backgroundColor: theme.colors.neutral200,
    },

    '@media print': {
      display: 'none',
    },
  }),

  ({ $isActive }) => {
    if ($isActive) {
      return {
        pointerEvents: 'all',
        opacity: 1,
      };
    }
    return {};
  },
);

interface Props {
  view?: EditorView;
}

export const SelectionToolbar: React.FC<Props> = ({ view }) => {
  const [ref, { left, top }] = usePosition({ view, isSelectingText: false, active: true });

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
      $isActive={!selection.empty}
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
