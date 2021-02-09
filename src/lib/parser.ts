import { MarkdownParser } from 'prosemirror-markdown';
import markdownit from 'markdown-it';
import { schema } from './schema';
import { checkboxPlugin } from './checkboxPlugin';

export const parser = new MarkdownParser(
  schema,
  markdownit('default', { html: false }).use(checkboxPlugin),
  {
    blockquote: { block: 'blockquote' },

    paragraph: { block: 'paragraph' },

    list_item: { block: 'list_item' },

    bullet_list: { block: 'bullet_list' },

    ordered_list: { block: 'ordered_list' },

    heading: { block: 'heading', getAttrs: tok => ({ level: +tok.tag.slice(1) }) },

    code_block: { block: 'code_block', noCloseToken: true },

    fence: {
      block: 'code_block',
      getAttrs: tok => ({ params: tok.info || '' }),
      noCloseToken: true,
    },

    hr: { node: 'horizontal_rule' },

    image: {
      node: 'image',
      getAttrs: tok => ({
        src: tok.attrGet('src'),
        alt: (tok.children && tok.children[0] && tok.children[0].content) || null,
      }),
    },

    hardbreak: { node: 'hard_break' },

    em: { mark: 'em' },

    strong: { mark: 'strong' },

    link: {
      mark: 'link',
      getAttrs: tok => ({
        href: tok.attrGet('href'),
        title: tok.attrGet('title') || null,
      }),
    },

    code_inline: { mark: 'code', noCloseToken: true },

    s: { mark: 'strikethrough' },

    checkbox_item: {
      block: 'checkbox_item',
      getAttrs: tok => ({
        checked: tok.attrGet('checked') ? true : undefined,
      }),
    },

    checkbox_list: { block: 'checkbox_list' },
  },
);
