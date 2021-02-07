import '@binarycapsule/ui-capsules/assets/global.css';
import * as React from 'react';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { history } from 'prosemirror-history';
import { keymap } from 'prosemirror-keymap';
import { Schema } from 'prosemirror-model';
import { baseKeymap } from 'prosemirror-commands';
import { dropCursor } from 'prosemirror-dropcursor';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { inputRules } from 'prosemirror-inputrules';
import applyDevTools from 'prosemirror-dev-tools';
import { buildKeymap } from './keymap';
import { schema } from './schema';
import { parser } from './parser';
import { serializer } from './serializer';
import { buildInputRules } from './inputRules';
import { StyledEditor } from './Editor.styles';
import { SelectionToolbar } from './SelectionToolbar/SelectionToolbar';

interface Props {
  defaultValue?: string;
  readonly?: boolean;
  onChange?(val: string): void;
}

export const Editor = forwardRef<any, Props>(({ defaultValue, readonly, onChange }, ref) => {
  const viewRef = useRef<EditorView>();
  const editorRef = useRef<HTMLDivElement>(null!);

  const [, forceUpdate] = useState({});

  useEffect(() => {
    const state = EditorState.create<Schema>({
      doc: parser.parse(defaultValue || ''),
      schema,
      plugins: [
        inputRules({ rules: buildInputRules(schema) }),
        history(),
        keymap(buildKeymap(schema)),
        keymap(baseKeymap),
        dropCursor(),
      ],
    });

    const view = new EditorView(editorRef.current, {
      state,
      editable: () => !readonly,
      dispatchTransaction: transaction => {
        if (viewRef.current) {
          const { state, transactions } = viewRef.current.state.applyTransaction(transaction);

          viewRef.current?.updateState(state);

          if (transactions.some(tr => tr.docChanged) && onChange) {
            onChange(getValue());
          }
        }

        forceUpdate({});
      },
    });

    applyDevTools(view);

    viewRef.current = view;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    viewRef.current?.update({
      ...viewRef.current?.props,
      editable: () => !readonly,
    });
  }, [readonly]);

  useImperativeHandle(ref, () => ({
    get view() {
      return viewRef.current;
    },

    get value() {
      return getValue();
    },
  }));

  const getValue = useCallback(() => {
    return viewRef.current?.state.doc ? serializer.serialize(viewRef.current.state.doc) : '';
  }, []);

  return (
    <>
      <SelectionToolbar view={viewRef.current} />

      <StyledEditor ref={editorRef} />
    </>
  );
});
