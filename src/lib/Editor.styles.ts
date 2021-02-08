import styled from '@emotion/styled';

const px = (value: number) => `${value}px`;

export const StyledEditor = styled.div`
  color: ${({ theme }) => theme.colors.neutral['700']};
  background: ${({ theme }) => theme.colors.bg};
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: ${({ theme }) => px(theme.fontSizes.body)};
  font-weight: ${({ theme }) => theme.fontWeights['400']};
  line-height: ${({ theme }) => theme.lineHeights.body};
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1 1 0;
  white-space: pre-wrap;

  .ProseMirror {
    position: relative;
    word-wrap: break-word;
    white-space: pre-wrap;
    white-space: break-spaces;
    -webkit-font-variant-ligatures: none;
    font-variant-ligatures: none;
    font-feature-settings: 'liga' 0; /* the above doesn't seem to work in Edge */
    height: 100%;
    overflow-y: auto;
  }

  pre {
    white-space: pre-wrap;
    position: relative;
    border-radius: 4px;
    -webkit-font-smoothing: initial;
    direction: ltr;
    text-align: left;
    word-spacing: normal;
    word-break: normal;
    tab-size: 4;
    hyphens: none;
    overflow: auto;
    margin-bottom: 16px;
    border: 1px solid ${({ theme }) => theme.colors.neutral['100']};
    background: ${({ theme }) => theme.colors.neutral['50']};

    code {
      display: block;
      overflow-x: auto;
      padding: 0.5em 0.65em;
      line-height: 1.6em;
      font-size: ${({ theme }) => px(theme.fontSizes.small)};
    }
  }

  .ProseMirror p > code {
    padding: 2px;
    border-radius: 3px;
    border: 1px solid ${({ theme }) => theme.colors.neutral['200']};
    background: ${({ theme }) => theme.colors.neutral['50']};
    font-size: ${({ theme }) => px(theme.fontSizes.small)};
  }

  p,
  pre,
  ul,
  ol {
    margin-bottom: 16px;
  }

  li {
    position: relative;
  }

  strong {
    font-weight: ${({ theme }) => theme.fontWeights['600']};
  }

  em {
    font-style: italic;
  }

  ul {
    display: block;
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    padding-inline-start: 40px;
  }

  ol {
    list-style-type: decimal;
  }

  li {
    p {
      margin: 0 !important;
    }
  }

  h1,
  h2,
  h3,
  h4 {
    font-weight: ${({ theme }) => theme.fontWeights['500']};
    margin: 0.6em 0 0.4em;
  }

  h1 {
    font-size: ${({ theme }) => px(theme.fontSizes.h3)};
  }

  h2 {
    font-size: ${({ theme }) => px(theme.fontSizes.h4)};
  }

  h3 {
    font-size: ${({ theme }) => px(theme.fontSizes.h5)};
  }

  h4 {
    font-size: ${({ theme }) => px(theme.fontSizes.h6)};
  }

  ul.checkbox_list {
    list-style: none;
    padding: 0 0 0 8px;
    margin: 0 0 16px;
  }

  ul.checkbox_list li {
    display: flex;
  }

  .ProseMirror-hideselection *::selection {
    background: transparent;
  }
  .ProseMirror-hideselection *::-moz-selection {
    background: transparent;
  }
  .ProseMirror-hideselection {
    caret-color: transparent;
  }

  .ProseMirror-selectednode {
    outline: 2px solid #8cf;
  }

  /* Make sure li selections wrap around markers */

  li.ProseMirror-selectednode {
    outline: none;
  }

  li.ProseMirror-selectednode:after {
    content: '';
    position: absolute;
    left: -32px;
    right: -2px;
    top: -2px;
    bottom: -2px;
    border: 2px solid #8cf;
    pointer-events: none;
  }

  .ProseMirror-textblock-dropdown {
    min-width: 3em;
  }

  .ProseMirror-menu {
    margin: 0 -4px;
    line-height: 1;
  }

  .ProseMirror-tooltip .ProseMirror-menu {
    width: -webkit-fit-content;
    width: fit-content;
    white-space: pre;
  }

  .ProseMirror-menuitem {
    margin-right: 3px;
    display: inline-block;
  }

  .ProseMirror-menuseparator {
    border-right: 1px solid #ddd;
    margin-right: 3px;
  }

  .ProseMirror-menu-dropdown,
  .ProseMirror-menu-dropdown-menu {
    font-size: 90%;
    white-space: nowrap;
  }

  .ProseMirror-menu-dropdown {
    vertical-align: 1px;
    cursor: pointer;
    position: relative;
    padding-right: 15px;
  }

  .ProseMirror-menu-dropdown-wrap {
    padding: 1px 0 1px 4px;
    display: inline-block;
    position: relative;
  }

  .ProseMirror-menu-dropdown:after {
    content: '';
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid currentColor;
    opacity: 0.6;
    position: absolute;
    right: 4px;
    top: calc(50% - 2px);
  }

  .ProseMirror-menu-dropdown-menu,
  .ProseMirror-menu-submenu {
    position: absolute;
    background: white;
    color: #666;
    border: 1px solid #aaa;
    padding: 2px;
  }

  .ProseMirror-menu-dropdown-menu {
    z-index: 15;
    min-width: 6em;
  }

  .ProseMirror-menu-dropdown-item {
    cursor: pointer;
    padding: 2px 8px 2px 4px;
  }

  .ProseMirror-menu-dropdown-item:hover {
    background: #f2f2f2;
  }

  .ProseMirror-menu-submenu-wrap {
    position: relative;
    margin-right: -4px;
  }

  .ProseMirror-menu-submenu-label:after {
    content: '';
    border-top: 4px solid transparent;
    border-bottom: 4px solid transparent;
    border-left: 4px solid currentColor;
    opacity: 0.6;
    position: absolute;
    right: 4px;
    top: calc(50% - 4px);
  }

  .ProseMirror-menu-submenu {
    display: none;
    min-width: 4em;
    left: 100%;
    top: -3px;
  }

  .ProseMirror-menu-active {
    background: #eee;
    border-radius: 4px;
  }

  .ProseMirror-menu-disabled {
    opacity: 0.3;
  }

  .ProseMirror-menu-submenu-wrap:hover .ProseMirror-menu-submenu,
  .ProseMirror-menu-submenu-wrap-active .ProseMirror-menu-submenu {
    display: block;
  }

  .ProseMirror-menubar {
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
    position: relative;
    min-height: 1em;
    color: #666;
    padding: 1px 6px;
    top: 0;
    left: 0;
    right: 0;
    border-bottom: 1px solid silver;
    background: white;
    z-index: 10;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    overflow: visible;
  }

  .ProseMirror-icon {
    display: inline-block;
    line-height: 0.8;
    vertical-align: -2px; /* Compensate for padding */
    padding: 2px 8px;
    cursor: pointer;
  }

  .ProseMirror-menu-disabled.ProseMirror-icon {
    cursor: default;
  }

  .ProseMirror-icon svg {
    fill: currentColor;
    height: 1em;
  }

  .ProseMirror-icon span {
    vertical-align: text-top;
  }
  .ProseMirror-gapcursor {
    display: none;
    pointer-events: none;
    position: absolute;
  }

  .ProseMirror-gapcursor:after {
    content: '';
    display: block;
    position: absolute;
    top: -2px;
    width: 20px;
    border-top: 1px solid black;
    animation: ProseMirror-cursor-blink 1.1s steps(2, start) infinite;
  }

  @keyframes ProseMirror-cursor-blink {
    to {
      visibility: hidden;
    }
  }

  .ProseMirror-focused .ProseMirror-gapcursor {
    display: block;
  }
  /* Add space around the hr to make clicking it easier */

  .ProseMirror-example-setup-style hr {
    padding: 2px 10px;
    border: none;
    margin: 1em 0;
  }

  .ProseMirror-example-setup-style hr:after {
    content: '';
    display: block;
    height: 1px;
    background-color: silver;
    line-height: 2px;
  }

  ul,
  ol {
    padding-left: 30px;
  }

  .ProseMirror blockquote {
    padding-left: 1em;
    border-left: 3px solid #eee;
    margin-left: 0;
    margin-right: 0;
  }

  .ProseMirror-example-setup-style img {
    cursor: default;
  }

  .ProseMirror-prompt {
    background: white;
    padding: 5px 10px 5px 15px;
    border: 1px solid silver;
    position: fixed;
    border-radius: 3px;
    z-index: 11;
    box-shadow: -0.5px 2px 5px rgba(0, 0, 0, 0.2);
  }

  .ProseMirror-prompt h5 {
    margin: 0;
    font-weight: normal;
    font-size: 100%;
    color: #444;
  }

  .ProseMirror-prompt input[type='text'],
  .ProseMirror-prompt textarea {
    background: #eee;
    border: none;
    outline: none;
  }

  .ProseMirror-prompt input[type='text'] {
    padding: 0 4px;
  }

  .ProseMirror-prompt-close {
    position: absolute;
    left: 2px;
    top: 1px;
    color: #666;
    border: none;
    background: transparent;
    padding: 0;
  }

  .ProseMirror-prompt-close:after {
    content: 'âœ•';
    font-size: 12px;
  }

  .ProseMirror-invalid {
    background: #ffc;
    border: 1px solid #cc7;
    border-radius: 4px;
    padding: 5px 10px;
    position: absolute;
    min-width: 10em;
  }

  .ProseMirror-prompt-buttons {
    margin-top: 5px;
    display: none;
  }
  #editor,
  .editor {
    background: white;
    color: black;
    background-clip: padding-box;
    border-radius: 4px;
    border: 2px solid rgba(0, 0, 0, 0.2);
    padding: 5px 0;
    margin-bottom: 23px;
  }

  .ProseMirror p:first-child,
  .ProseMirror h1:first-child,
  .ProseMirror h2:first-child,
  .ProseMirror h3:first-child,
  .ProseMirror h4:first-child,
  .ProseMirror h5:first-child,
  .ProseMirror h6:first-child {
    margin-top: 10px;
  }

  .ProseMirror {
    padding: 4px 8px 4px 14px;
    line-height: 1.2;
    outline: none;
  }

  .ProseMirror p {
    margin-bottom: 1em;
    line-height: ${({ theme }) => theme.lineHeights.body};
  }
`;
