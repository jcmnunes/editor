<img src="https://raw.githubusercontent.com/jcmnunes/editor/master/public/logo512.png" alt="BC logo" width="100px" height="100px">

# BC Editor

### 🚨 **Breakable toy - Do not use in real projects** 🚨
**This library is a breakable toy. New versions will often contain breaking changes, even for non-major releases.**

---

BC Editor is a [Prosemirror](https://prosemirror.net/) based text editor with
markdown shortcuts and serialization. It is highly inspired by:

- [Rich Markdown Editor](https://github.com/outline/rich-markdown-editor) (the
  editor that powers [Outline](https://www.getoutline.com/))
- The editor inside the [Linear app](https://linear.app/)

Visit the demo at
[editor.binarycapsule.tech](https://editor.binarycapsule.tech).

## Getting started

The Editor is available as an npm package:

```bash
npm i @binarycapsule/editor
```

Peer dependencies:

```
npm i react react-dom @binarycapsule/ui-capsules @stitches/react
```

Note: this package is meant to be used inside a app already setup with the [ui-capsules](https://github.com/jcmnunes/ui-capsules) package.

## Usage

As a minimal implementation, pass a ref to the Editor. The editor's value can be
accessed through it:

```tsx
export const App = () => {
  const editorRef = React.useRef<EditorRef>(null);

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
```

## Licensing

Licensed under the [MIT License](./LICENSE).
