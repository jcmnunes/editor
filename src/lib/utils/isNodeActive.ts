import { EditorState } from 'prosemirror-state';
import { NodeType } from 'prosemirror-model';

export const isNodeActive = (
  nodeType: NodeType,
  state: EditorState,
  attrs: Record<string, any> = {},
) => {
  let { $from, to } = state.selection;

  return to <= $from.end() && $from.parent.hasMarkup(nodeType, attrs);
};
