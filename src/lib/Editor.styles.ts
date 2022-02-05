import { styled, keyframes } from '@binarycapsule/ui-capsules';

const ProseMirrorCursorBlink = keyframes({
  to: {
    visibility: 'hidden',
  },
});

export const StyledEditor = styled('div', {
  color: '$neutral700',
  background: '$bg',
  fontFamily: '$inter',
  fontSize: '$sm',
  fontWeight: 400,
  lineHeight: '$sm',
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  flex: '1 1 0',
  whiteSpace: 'pre-wrap',

  '.ProseMirror': {
    position: 'relative',
    wordWrap: 'break-word',
    whiteSpace: 'break-spaces',
    '-webkit-font-variant-ligatures': 'none',
    'font-variant-ligatures': 'none',
    'font-feature-settings': "'liga' 0" /* the above doesn't seem to work in Edge */,
    height: '100%',
    overflowY: 'auto',
    flex: 1,
    padding: '4px 8px 4px 14px',
    lineHeight: 1.2,
    outline: 'none',

    pre: {
      whiteSpace: 'pre-wrap',
      position: 'relative',
      borderRadius: '4px',
      '-webkit-font-smoothing': 'initial',
      direction: 'ltr',
      textAlign: 'left',
      wordSpacing: 'normal',
      wordBreak: 'normal',
      tabSize: 4,
      hyphens: 'none',
      overflow: 'auto',
      marginBottom: '16px',
      border: '1px solid $neutral100',
      background: '$neutral50',

      code: {
        display: 'block',
        overflowX: 'auto',
        padding: '0.5em 0.65em',
        lineHeight: '1.6em',
        fontSize: '$xs',
      },
    },

    'p > code': {
      padding: '2px',
      borderRadius: '3px',
      border: '1px solid $neutral200',
      background: '$neutral50',
      fontSize: '$sm',
    },

    'p, pre, ul, ol': {
      marginBottom: '16px',
    },

    strong: {
      fontWeight: 600,
    },

    em: {
      fontStyle: 'italic',
    },

    ul: {
      display: 'block',
      'list-style-type': 'disc',
      'margin-block-start': '1em',
      'margin-block-end': '1em',
      'padding-inline-start': '40px',

      'li p': {
        margin: '0 !important',
      },
    },

    ol: {
      'list-style-type': 'decimal',

      'li p': {
        margin: '0 !important',
      },
    },

    li: {
      position: 'relative',

      'div p': {
        margin: '0 !important',
      },
    },

    'h1, h2, h3, h4': {
      fontWeight: 500,
      margin: '0.6em 0 0.4em',
    },

    h1: {
      fontSize: '$2xl',
    },

    h2: {
      fontSize: '$xl',
    },

    h3: {
      fontSize: '$lg',
    },

    h4: {
      fontSize: '$md',
    },

    'ul.checkbox_list': {
      'list-style': 'none',
      padding: '0 0 0 8px',
      margin: '0 0 16px',
    },

    'ul.checkbox_list li': {
      display: 'flex',
    },

    blockquote: {
      paddingLeft: '1em',
      borderLeft: '3px solid #eee',
      marginLeft: 0,
      marginRight: 0,
    },

    'ul, ol': {
      paddingLeft: 30,
    },

    a: {
      color: '$primary500',
      cursor: 'pointer',
    },
  },

  '.ProseMirror-hideselection *::selection': {
    background: 'transparent',
  },

  '.ProseMirror-hideselection *::-moz-selection': {
    background: 'transparent',
  },

  '.ProseMirror-hideselection': {
    caretColor: 'transparent',
  },

  '.ProseMirror-selectednode': {
    outline: '2px solid #8cf',
  },

  /* Make sure li selections wrap around markers */

  'li.ProseMirror-selectednode': {
    outline: 'none',
  },

  'li.ProseMirror-selectednode:after': {
    content: '""',
    position: 'absolute',
    left: -32,
    right: -2,
    top: -2,
    bottom: -2,
    border: '2px solid #8cf',
    pointerEvents: 'none',
  },

  '.ProseMirror-gapcursor': {
    display: 'none',
    pointerEvents: 'none',
    position: 'absolute',
  },

  '.ProseMirror-gapcursor:after': {
    content: '""',
    display: 'block',
    position: 'absolute',
    top: -2,
    width: 20,
    borderTop: '1px solid black',
    animation: `${ProseMirrorCursorBlink} 1.1s steps(2, start) infinite`,
  },

  '.ProseMirror-focused .ProseMirror-gapcursor': {
    display: 'block',
  },

  '.ProseMirror-prompt': {
    background: 'white',
    padding: '5px 10px 5px 15px',
    border: '1px solid silver',
    position: 'fixed',
    borderRadius: '3px',
    zIndex: 11,
    boxShadow: '-0.5px 2px 5px rgba(0, 0, 0, 0.2)',
  },

  '.ProseMirror-prompt h5': {
    margin: 0,
    fontWeight: 'normal',
    fontSize: '100%',
    color: '#444',
  },

  ".ProseMirror-prompt input[type='text'], .ProseMirror-prompt textarea": {
    background: '#eee',
    border: 'none',
    outline: 'none',
  },

  ".ProseMirror-prompt input[type='text']": {
    padding: '0 4px',
  },

  '.ProseMirror-prompt-close': {
    position: 'absolute',
    left: 2,
    top: 1,
    color: '#666',
    border: 'none',
    background: 'transparent',
    padding: 0,
  },

  '.ProseMirror-prompt-close:after': {
    content: 'âœ•',
    fontSize: '12px',
  },

  '.ProseMirror-invalid': {
    background: '#ffc',
    border: '1px solid #cc7',
    borderRadius: '4px',
    padding: '5px 10px',
    position: 'absolute',
    minWidth: '10em',
  },

  '.ProseMirror-prompt-buttons': {
    marginTop: '5px',
    display: 'none',
  },

  '#editor, .editor': {
    background: 'white',
    color: 'black',
    backgroundClip: 'padding-box',
    borderRadius: '4px',
    border: '2px solid rgba(0, 0, 0, 0.2)',
    padding: '5px 0',
    marginBottom: '23px',
  },

  '.ProseMirror p:first-child, .ProseMirror h1:first-child, .ProseMirror h2:first-child, .ProseMirror h3:first-child, .ProseMirror h4:first-child, .ProseMirror h5:first-child, .ProseMirror h6:first-child': {
    marginTop: 10,
  },

  '.ProseMirror p': {
    marginBottom: '1em',
    lineHeight: '$sm',
  },
});
