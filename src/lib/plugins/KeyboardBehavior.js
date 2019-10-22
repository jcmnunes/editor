import isModKey from '../utils/isModKey';

export default function KeyboardBehavior() {
  const onArrowRight = (ev, editor, next) => {
    const { value } = editor;
    const { activeMarks, selection } = value;
    const currentText = value.focusText;
    const { offset } = selection.start;
    if (
      activeMarks.filter(mark => mark.type === 'code').size > 0 &&
      offset === currentText.text.length
    ) {
      editor.removeMark('code');
      // If the inline code is the last text ➜ insert a space
      if (currentText.key === value.endBlock.getLastText().key) {
        editor.insertText(' ');
      }
    }
    return next();
  };

  const onEnter = (event, editor, next) => {
    const { value } = editor;
    const { selection } = value;
    const { start, end, isExpanded } = selection;
    if (isExpanded) return next();

    const { startBlock } = value;
    if (start.offset === 0 && startBlock.text.length === 0) return onBackspace(event, editor, next);
    if (end.offset !== startBlock.text.length) return next();

    if (
      startBlock.type !== 'heading-one' &&
      startBlock.type !== 'heading-two' &&
      startBlock.type !== 'heading-three' &&
      startBlock.type !== 'block-quote'
    ) {
      return next();
    }

    event.preventDefault();
    editor.splitBlock().setBlocks('paragraph');

    return null;
  };

  const onBackspace = (event, editor, next) => {
    const { value } = editor;
    const { selection } = value;
    if (selection.isExpanded) return next();
    if (selection.start.offset !== 0) return next();

    const { startBlock } = value;

    event.preventDefault();
    editor.setBlocks('paragraph');

    if (startBlock.type === 'list-item') {
      editor.unwrapBlock('bulleted-list');
      editor.unwrapBlock('ordered-list');
      return null;
    }

    startBlock.getMarks().forEach(mark => editor.removeMark(mark));

    // Hack to remove code mark styling
    editor.insertText(' ');
    editor.deleteBackward(1);

    return next();
  };

  return {
    onKeyDown(ev, editor, next) {
      if (isModKey(ev)) return next();

      switch (ev.key) {
        case 'Enter':
          return onEnter(ev, editor, next);
        case 'Backspace':
          return onBackspace(ev, editor, next);
        case 'Right':
        case 'ArrowRight':
          return onArrowRight(ev, editor, next);
        default:
          return next();
      }
    },
  };
}
