import * as React from 'react';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useEffectOnce } from './hooks/useEffectOnce';
import { history } from 'prosemirror-history';
import { keymap } from 'prosemirror-keymap';
import { Schema } from 'prosemirror-model';
import { baseKeymap } from 'prosemirror-commands';
import { dropCursor } from 'prosemirror-dropcursor';
import { gapCursor } from 'prosemirror-gapcursor';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { inputRules } from 'prosemirror-inputrules';
import { buildKeymap, buildKeymapCheckbox } from './keymap';
import { schema } from './schema';
import { parser } from './parser';
import { serializer } from './serializer';
import { buildInputRules } from './inputRules';
import { StyledEditor } from './Editor.styles';
import { SelectionToolbar } from './SelectionToolbar/SelectionToolbar';
import { paste } from './paste';
import { click } from './click';
import { EditorRef } from './types';

interface Props {
  defaultValue?: string;
  isReadonly?: boolean;
  onChange?(val: string): void;
}

// eslint-disable-next-line react/display-name
export const Editor = forwardRef<EditorRef, Props>(
  ({ defaultValue, isReadonly, onChange }, ref) => {
    const viewRef = useRef<EditorView>();

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const editorRef = useRef<HTMLDivElement>(null!);

    const [, forceUpdate] = useState({});

    const isFirstRender = useRef(true);

    const createState = useCallback(value => {
      return EditorState.create<Schema>({
        doc: parser.parse(value || ''),
        schema,
        plugins: [
          inputRules({ rules: buildInputRules(schema) }),
          history(),
          keymap(buildKeymap(schema)),
          keymap(buildKeymapCheckbox(schema)),
          keymap(baseKeymap),
          paste(schema),
          click(schema),
          dropCursor(),
          gapCursor(),
        ],
      });
    }, []);

    useEffectOnce(() => {
      const view = new EditorView(editorRef.current, {
        state: createState(defaultValue),
        editable: () => !isReadonly,
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

      viewRef.current = view;

      const handleEditorClick = (evt: MouseEvent) => {
        if (evt && evt.target && (evt.target as Element).classList.contains('editor-checkbox')) {
          const { tr } = view.state;
          const { top, left } = (evt.target as Element).getBoundingClientRect();
          const result = view.posAtCoords({ top, left });

          if (result) {
            const transaction = tr.setNodeMarkup(result.inside, undefined, {
              checked: (evt.target as any).checked,
            });
            view.dispatch(transaction);
          }
        }
      };

      document.body.addEventListener('click', handleEditorClick, true);

      return () => {
        document.body.removeEventListener('click', handleEditorClick, true);
      };
    });

    useEffect(() => {
      if (isFirstRender.current) {
        isFirstRender.current = false;

        return;
      }

      viewRef.current?.update({
        ...viewRef.current?.props,
        editable: () => !isReadonly,
      });
    }, [isReadonly]);

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
        {!isReadonly && <SelectionToolbar view={viewRef.current} />}

        <StyledEditor ref={editorRef} />
      </>
    );
  },
);
