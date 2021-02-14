import { EditorView } from 'prosemirror-view';
import useMeasure, { UseMeasureRef } from 'react-use/lib/useMeasure';

interface MenuPosition {
  left: number;
  top: number;
  offset: number;
  visible: boolean;
}

const defaultPosition: MenuPosition = {
  left: -1000,
  top: 0,
  offset: 0,
  visible: false,
};

interface UsePositionParams {
  view?: EditorView;
  isSelectingText: boolean;
  active: boolean;
}

export const usePosition = ({
  view,
  active,
  isSelectingText,
}: UsePositionParams): [UseMeasureRef, MenuPosition] => {
  const [ref, { width: menuWidth, height: menuHeight }] = useMeasure();

  if (!view || !active || !menuWidth || !menuHeight || isSelectingText) {
    return [ref, defaultPosition];
  }

  const { selection } = view.state;

  // based on the start and end of the selection calculate the position at
  // the center top
  const fromPos = view.coordsAtPos(selection.$from.pos);
  const toPos = view.coordsAtPos(selection.$to.pos);

  // ensure that start < end for the menu to be positioned correctly
  const selectionBounds = {
    top: Math.min(fromPos.top, toPos.top),
    bottom: Math.max(fromPos.bottom, toPos.bottom),
    left: Math.min(fromPos.left, toPos.left),
    right: Math.max(fromPos.right, toPos.right),
  };

  // calculate the horizontal center of the selection
  const halfSelection = Math.abs(selectionBounds.right - selectionBounds.left) / 2;
  const centerOfSelection = selectionBounds.left + halfSelection;

  // position the menu so that it is centered over the selection except in
  // the cases where it would extend off the edge of the screen. In these
  // instances leave a margin
  const margin = 12;
  const left = Math.min(
    window.innerWidth - menuWidth - margin,
    Math.max(margin, centerOfSelection - menuWidth / 2),
  );
  const top = Math.min(
    window.innerHeight - menuHeight - margin,
    Math.max(margin, selectionBounds.top - menuHeight),
  );

  // if the menu has been offset to not extend offscreen then we should adjust
  // the position of the triangle underneath to correctly point to the center
  // of the selection still
  const offset = left - (centerOfSelection - menuWidth / 2);

  return [
    ref,
    {
      left: Math.round(left + window.scrollX),
      top: Math.round(top + window.scrollY),
      offset: Math.round(offset),
      visible: true,
    },
  ];
};
