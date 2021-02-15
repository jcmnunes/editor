export const defaultValue = `# BC Editor

BC Editor is a [Prosemirror](https://prosemirror.net/) based text editor with markdown shortcuts and serialization. It is highly inspired by:

- [Rich Markdown Editor](https://github.com/outline/rich-markdown-editor) (the editor that powers [Outline](https://www.getoutline.com/))
- The editor inside the [Linear app](https://linear.app/)

## Features

It contains common blocks like:

1. Bullet and ordered lists

2. Blockquotes

3. Todo lists

4. Code blocks

It contains also several marks, like;

- [x] **bold**

- [x] _italics_

- [x] ~~strikethrough~~

- [x] [links](https://uic.binarycapsule.com)

### Getting started

The Editor is available as an npm package:

\`\`\`
$ npm i @binarycapsule/editor
\`\`\`

> Make sure all peer dependencies are installed

### Usage

In the most simple implementation, pass a ref to the Editor. The editor's value can be accessed through it:

\`\`\`
export const App = () => {
  const editorRef = React.useRef<{ view: EditorView; value: string }>();

  return (
    <div>
      <button
        onClick={() => {
          // Read the value from the ref
          console.log(editorRef.current?.value);
        }}
      >
        Save
      </button>

      <Editor ref={editorRef} />
    </div>
  );
};
\`\`\`

> Check the [source of this page](https://github.com/jcmnunes/editor/blob/master/src/components/BCEditor) for a more complete example.
`;
