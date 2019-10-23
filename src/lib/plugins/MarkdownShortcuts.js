const getType = chars => {
  switch (chars) {
    case '*':
    case '-':
    case '1.':
      return 'list-item';
    case '>':
      return 'block-quote';
    case '#':
      return 'heading-one';
    case '##':
      return 'heading-two';
    case '###':
      return 'heading-three';
    default:
      return null;
  }
};

const inlineShortcuts = [
  { mark: 'bold', shortcut: '**' },
  { mark: 'bold', shortcut: '__' },
  { mark: 'italic', shortcut: '*' },
  { mark: 'italic', shortcut: '_' },
  { mark: 'code', shortcut: '`' },
  { mark: 'inserted', shortcut: '++' },
  { mark: 'deleted', shortcut: '~~' },
];

export default function MarkdownShortcuts() {
  const onSpace = (ev, editor, next) => {
    const { value } = editor;
    const { selection, startBlock } = value;
    if (selection.isExpanded) return next();

    const {
      start: { offset },
    } = selection;
    const chars = startBlock.text.slice(0, offset).replace(/\s*/g, '');
    const type = getType(chars);
    if (type) {
      if (type === 'list-item' && startBlock.type === 'list-item') return next();
      ev.preventDefault();

      editor.setBlocks(type);

      if (type === 'list-item') {
        if (chars === '1.') {
          editor.wrapBlock('ordered-list');
        } else {
          editor.wrapBlock('bulleted-list');
        }
      }

      editor.moveFocusToStartOfNode(startBlock).delete();
      return next();
    }

    const currentText = value.focusText;

    if (currentText.text.substr(currentText.text.length - 2) === '``') {
      ev.preventDefault();
      editor.deleteBackward(2).addMark('code');
      return next();
    }

    if (currentText.text.substr(currentText.text.length - 3) === '```') {
      // TODO ➜ Code block
      return next();
    }

    for (const key of inlineShortcuts) {
      // find all inline characters
      const { mark, shortcut } = key;
      const inlineTags = [];

      // only add tags if they have spaces around them or the tag is beginning
      // or the end of the block
      for (let i = 0; i < currentText.text.length; i += 1) {
        const { text } = currentText;
        const start = i;
        const end = i + shortcut.length;
        const beginningOfBlock = start === 0;
        const endOfBlock = end === text.length;
        const surroundedByWhitespaces = [
          text.slice(start - 1, start),
          text.slice(end, end + 1),
        ].includes(' ');

        if (
          text.slice(start, end) === shortcut &&
          (beginningOfBlock || endOfBlock || surroundedByWhitespaces)
        ) {
          inlineTags.push(i);
        }
      }

      // if we have multiple tags then mark the text between
      if (inlineTags.length > 1) {
        const firstCodeTagIndex = inlineTags[0];
        const lastCodeTagIndex = inlineTags[inlineTags.length - 1];

        return editor
          .moveToStartOfNode(currentText)
          .moveForward(firstCodeTagIndex)
          .deleteForward(shortcut.length)
          .moveToStartOfNode(currentText)
          .moveForward(lastCodeTagIndex)
          .deleteBackward(shortcut.length)
          .moveAnchorTo(firstCodeTagIndex)
          .moveFocusTo(lastCodeTagIndex - shortcut.length)
          .addMark(mark)
          .moveToEnd()
          .removeMark(mark);
      }
    }

    return next();
  };

  return {
    onKeyDown(ev, editor, next) {
      switch (ev.key) {
        case ' ':
          return onSpace(ev, editor, next);
        default:
          return next();
      }
    },
  };
}
