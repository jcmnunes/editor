import { Schema } from 'prosemirror-model';

export const schema = new Schema({
  nodes: {
    doc: {
      content: 'block+',
    },

    paragraph: {
      content: 'inline*',
      group: 'block',
      parseDOM: [{ tag: 'p' }],
      toDOM: function toDOM() {
        return ['p', 0];
      },
    },

    blockquote: {
      content: 'block+',
      group: 'block',
      parseDOM: [{ tag: 'blockquote' }],
      toDOM: function toDOM() {
        return ['blockquote', 0];
      },
    },

    horizontal_rule: {
      group: 'block',
      parseDOM: [{ tag: 'hr' }],
      toDOM: function toDOM() {
        return ['div', ['hr']];
      },
    },

    heading: {
      attrs: { level: { default: 1 } },
      content: '(text | image)*',
      group: 'block',
      defining: true,

      parseDOM: [
        { tag: 'h1', attrs: { level: 1 } },
        { tag: 'h2', attrs: { level: 2 } },
        { tag: 'h3', attrs: { level: 3 } },
        { tag: 'h4', attrs: { level: 4 } },
        { tag: 'h5', attrs: { level: 5 } },
        { tag: 'h6', attrs: { level: 6 } },
      ],

      toDOM: function toDOM(node) {
        return ['h' + node.attrs.level, 0];
      },
    },

    code_block: {
      content: 'text*',
      group: 'block',
      code: true,
      defining: true,
      marks: '',
      attrs: { params: { default: '' } },

      parseDOM: [
        {
          tag: 'pre',
          preserveWhitespace: 'full',
        },
      ],

      toDOM: function toDOM(node) {
        return ['pre', node.attrs.params ? { 'data-params': node.attrs.params } : {}, ['code', 0]];
      },
    },

    ordered_list: {
      content: 'list_item+',
      group: 'block',
      attrs: { order: { default: 1 }, tight: { default: false } },

      parseDOM: [
        {
          tag: 'ol',
          getAttrs: (dom: any) => {
            return {
              order: dom.hasAttribute('start') ? +dom.getAttribute('start') : 1,
            };
          },
        },
      ],

      toDOM: function toDOM(node) {
        return [
          'ol',
          {
            start: node.attrs.order === 1 ? null : node.attrs.order,
            'data-tight': node.attrs.tight ? 'true' : null,
          },
          0,
        ];
      },
    },

    bullet_list: {
      content: 'list_item+',
      group: 'block',
      attrs: { tight: { default: false } },

      parseDOM: [{ tag: 'ul' }],

      toDOM: function toDOM() {
        return ['ul', 0];
      },
    },

    list_item: {
      content: 'paragraph block*',
      defining: true,

      parseDOM: [{ tag: 'li' }],

      toDOM: function toDOM() {
        return ['li', 0];
      },
    },

    text: {
      group: 'inline',
    },

    image: {
      inline: true,
      attrs: {
        src: {},
        alt: { default: null },
      },
      group: 'inline',
      draggable: true,

      parseDOM: [
        {
          tag: 'img[src]',
          getAttrs: (dom: any) => {
            return {
              src: dom.getAttribute('src'),
              alt: dom.getAttribute('alt'),
            };
          },
        },
      ],

      toDOM: function toDOM(node) {
        return ['img', node.attrs];
      },
    },

    hard_break: {
      inline: true,
      group: 'inline',
      selectable: false,
      parseDOM: [{ tag: 'br' }],
      toDOM: () => {
        return ['br'];
      },
    },
  },

  marks: {
    em: {
      parseDOM: [
        { tag: 'i' },
        { tag: 'em' },
        {
          style: 'font-style',
          getAttrs: value => value === 'italic' && null,
        },
      ],

      toDOM: () => ['em'],
    },

    strong: {
      parseDOM: [
        { tag: 'b' },
        { tag: 'strong' },
        {
          style: 'font-weight',
          getAttrs: (value: any) => value === 'bold' && null,
        },
      ],

      toDOM: () => ['strong'],
    },

    link: {
      attrs: {
        href: {},
      },
      inclusive: false,

      parseDOM: [
        {
          tag: 'a[href]',
          getAttrs: (dom: any) => ({ href: dom.getAttribute('href') }),
        },
      ],

      toDOM: node => [
        'a',
        {
          ...node.attrs,
          rel: 'noopener noreferrer nofollow',
        },
        0,
      ],
    },

    code: {
      excludes: '_',
      parseDOM: [{ tag: 'code' }],
      toDOM: () => ['code'],
    },
  },
});
