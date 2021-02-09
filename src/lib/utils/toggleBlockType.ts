import { setBlockType } from 'prosemirror-commands';
import { isNodeActive } from './isNodeActive';
import { EditorView } from 'prosemirror-view';
import { NodeType } from 'prosemirror-model';

export const toggleBlockType = (type: NodeType, view: EditorView, attrs = {}) => {
  const isActive = isNodeActive(type, view.state, attrs);

  if (isActive) {
    return setBlockType(view.state.schema.nodes.paragraph)(view.state, view.dispatch);
  }

  return setBlockType(type, attrs)(view.state, view.dispatch);
};
