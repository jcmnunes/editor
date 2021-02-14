import { wrapIn, lift } from 'prosemirror-commands';
import { EditorState } from 'prosemirror-state';
import { NodeType } from 'prosemirror-model';
import { isNodeActive } from './isNodeActive';

export const toggleWrap = (type: NodeType, attrs?: Record<string, any>) => {
  return (state: EditorState, dispatch: any) => {
    const isActive = isNodeActive(type, state);

    if (isActive) {
      return lift(state, dispatch);
    }

    return wrapIn(type, attrs)(state, dispatch);
  };
};
