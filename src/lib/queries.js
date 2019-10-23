const queries = {
  getCurrentText(editor) {
    const { value } = editor;
    return value.focusText;
  },

  isLinkActive(editor, value) {
    const { inlines } = value;
    return inlines.some(i => i.type === 'link');
  },

  showPlaceholder(editor, node) {
    if (editor.value.document.getBlocks().size > 1) {
      return false;
    }
    return (
      node.object === 'block' &&
      node.type === 'paragraph' &&
      node.getMarks().size === 0 &&
      node.text === ''
    );
  },
};

export default queries;
