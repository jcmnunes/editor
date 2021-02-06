import '@binarycapsule/ui-capsules/assets/global.css';
import * as React from 'react';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { history } from 'prosemirror-history';
import { keymap } from 'prosemirror-keymap';
import { Schema } from 'prosemirror-model';
import { baseKeymap } from 'prosemirror-commands';
import { dropCursor } from 'prosemirror-dropcursor';
import { EditorState } from 'prosemirror-state';
import { theme, ThemeProvider } from '@binarycapsule/ui-capsules';
import { EditorView } from 'prosemirror-view';
import { inputRules } from 'prosemirror-inputrules';
import { buildKeymap } from './keymap';
import { schema } from './schema';
import { parser } from './parser';
import { serializer } from './serializer';
import { buildInputRules } from './inputRules';
import { StyledEditor } from './Editor.styles';

interface Props {
  defaultValue?: string;
  readonly?: boolean;
  onChange?(val: string): void;
}

export const Editor = forwardRef<any, Props>(({ defaultValue, readonly }, ref) => {
  const viewRef = useRef<{ view: EditorView }>();

  const [state, setState] = useState(() =>
    EditorState.create<Schema>({
      doc: parser.parse(defaultValue || ''),
      schema,
      plugins: [
        inputRules({ rules: buildInputRules(schema) }),
        history(),
        keymap(buildKeymap(schema)),
        keymap(baseKeymap),
        dropCursor(),
      ],
    }),
  );

  useImperativeHandle(ref, () => ({
    get view() {
      return viewRef.current?.view;
    },

    get value() {
      return viewRef.current?.view.state.doc
        ? serializer.serialize(viewRef.current.view.state.doc)
        : '';
    },
  }));

  return (
    <ThemeProvider theme={theme}>
      <StyledEditor
        state={state}
        onChange={setState}
        ref={viewRef as any}
        editable={() => !readonly}
      />
    </ThemeProvider>
  );
});
