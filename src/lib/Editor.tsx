import '@binarycapsule/ui-capsules/assets/global.css';
import * as React from 'react';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import useEffectOnce from 'react-use/lib/useEffectOnce';
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

interface Props {
  defaultValue?: string;
  readonly?: boolean;
  onChange?(val: string): void;
}

export const Editor = forwardRef<any, Props>(({ defaultValue, readonly, onChange }, ref) => {
  const viewRef = useRef<EditorView>();
  const editorRef = useRef<HTMLDivElement>(null!);

  const [, forceUpdate] = useState({});

  useEffectOnce(() => {
    const state = EditorState.create<Schema>({
      doc: parser.parse(defaultValue || ''),
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

    viewRef.current = view;

    document.body.addEventListener(
      'click',
      evt => {
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
      },
      true,
    );
  });

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
      {!readonly && <SelectionToolbar view={viewRef.current} />}

      <StyledEditor ref={editorRef} />
    </>
  );
});
