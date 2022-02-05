import { EditorState, NodeSelection } from 'prosemirror-state';
import { NodeType } from 'prosemirror-model';
import { findParentNode } from './findParentNode';

export const isNodeSelection = (selection: any) => {
  return selection instanceof NodeSelection;
};

export const equalNodeType = (nodeType: any, node: any) => {
  return (Array.isArray(nodeType) && nodeType.indexOf(node.type) > -1) || node.type === nodeType;
};

export const findSelectedNodeOfType = (nodeType: any, selection: any) => {
  if (isNodeSelection(selection)) {
    const { node, $from } = selection;

    if (equalNodeType(nodeType, node)) {
      return { node, pos: $from.pos, depth: $from.depth };
    }
  }

  return null;
};

export const isNodeActive = (
  nodeType: NodeType,
  state: EditorState,
  attrs: Record<string, any> = {},
) => {
  const node =
    findSelectedNodeOfType(nodeType, state.selection) ||
    findParentNode((node: any) => node.type === nodeType)(state.selection);

  if (!Object.keys(attrs).length || !node) {
    return !!node;
  }

  return node.node.hasMarkup(nodeType, { ...node.node.attrs, ...attrs });
};
