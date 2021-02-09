import { isMarkActive } from './isMarkActive';
import { EditorState } from 'prosemirror-state';

export default function isInCode(state: EditorState) {
  const $head = state.selection.$head;

  for (let d = $head.depth; d > 0; d--) {
    if ($head.node(d).type === state.schema.nodes.code_block) {
      return true;
    }
  }

  return isMarkActive(state, state.schema.marks.code);
}
