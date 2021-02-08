import { Schema } from 'prosemirror-model';

export const isList = (node: any, schema: Schema) => {
  return (
    node.type === schema.nodes.bullet_list ||
    node.type === schema.nodes.ordered_list ||
    node.type === schema.nodes.todo_list
  );
};
