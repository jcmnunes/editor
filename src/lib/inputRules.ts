import {
  ellipsis,
  emDash,
  InputRule,
  textblockTypeInputRule,
  wrappingInputRule,
} from 'prosemirror-inputrules';
import { MarkType, NodeType, Schema } from 'prosemirror-model';
import { markInputRule } from './utils/markInputRule';

const nodeInputRules = {
  blockquote: (nodeType: NodeType) => {
    return wrappingInputRule(/^\s*>\s$/, nodeType);
  },

  bullet_list: (nodeType: NodeType) => {
    return wrappingInputRule(/^\s*([-+*])\s$/, nodeType);
  },

  code_block: (nodeType: NodeType) => {
    return textblockTypeInputRule(/^```$/, nodeType);
  },

  heading: (nodeType: NodeType) => {
    const maxLevel = 4;

    return textblockTypeInputRule(new RegExp('^(#{1,' + maxLevel + '})\\s$'), nodeType, match => ({
      level: match[1].length,
    }));
  },

  ordered_list: (nodeType: NodeType) => {
    return wrappingInputRule(
      /^(\d+)\.\s$/,
      nodeType,
      match => ({ order: +match[1] }),
      (match, node) => node.childCount + node.attrs.order === +match[1],
    );
  },

  checkbox_list: (nodeType: NodeType) => {
    return wrappingInputRule(/^-?\s*(\[])\s$/i, nodeType);
  },
};

export const markInputRules = {
  em: (markType: MarkType) => {
    return markInputRule(/(?:^|[^_])(_([^_]+)_)$/, markType);
  },

  strong: (markType: MarkType) => {
    return markInputRule(/(?:\*\*)([^*]+)(?:\*\*)$/, markType);
  },

  code: (markType: MarkType) => {
    return markInputRule(/(?:^|[^`])(`([^`]+)`)$/, markType);
  },

  strikethrough: (markType: MarkType) => {
    return markInputRule(/(?:~~)([^*]+)(?:~~)$/, markType);
  },
};

const rightArrow = new InputRule(/->$/, '→');

export const buildInputRules = (schema: Schema) => {
  const result = [ellipsis, emDash, rightArrow];

  Object.entries(nodeInputRules).forEach(([name, rule]) => {
    result.push(rule(schema.nodes[name]));
  });

  Object.entries(markInputRules).forEach(([name, rule]) => {
    result.push(rule(schema.marks[name]));
  });

  return result;
};
