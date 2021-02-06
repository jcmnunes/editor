import * as React from 'react';
import { CSSProperties, forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { DirectEditorProps, EditorProps, EditorView } from 'prosemirror-view';
import { EditorState, Transaction } from 'prosemirror-state';

const buildProps = (props: Partial<Props>, viewRef: any): Partial<DirectEditorProps> => {
  return {
    ...props,
    dispatchTransaction: transaction => {
      // `dispatchTransaction` takes precedence.
      if (props.dispatchTransaction) {
        props.dispatchTransaction(transaction);
      } else if (props.onChange) {
        props.onChange(viewRef.current.state.apply(transaction));
      }
    },
  };
};

export interface Handle {
  view: EditorView;
}

interface PropsBase extends EditorProps {
  state: EditorState;
  style?: CSSProperties;
  className?: string;
}

// If using TypeScript, the compiler will enforce that either
// `onChange` or `dispatchTransaction` are provided, but not both:

interface PropsWithOnChange {
  onChange: (state: EditorState) => void;
  dispatchTransaction?: never;
}

interface PropsWithDispatchTransaction {
  dispatchTransaction: (transaction: Transaction) => void;
  onChange?: never;
}

type Props = PropsBase & (PropsWithOnChange | PropsWithDispatchTransaction);

export const ProseMirror = forwardRef<Handle, Props>(function ProseMirror(props, ref): JSX.Element {
  const root = useRef<HTMLDivElement>(null!);

  const initialProps = useRef(props);

  const viewRef = useRef<EditorView>(null!);

  // If this is a non-initial render, update the editor view with
  // the React render.
  // - First update editor state using `EditorView#updateState()`.
  // - Then update other props using `EditorView#setProps()`.
  // If we update state with other props together using
  // `setProps()`, scroll-into-view will not occur due to:
  // https://github.com/ProseMirror/prosemirror-view/blob/13b046a834b489530a98dd362fa55703e52e076d/src/index.js#L183-L195
  const { state, ...restProps } = props;
  viewRef.current?.updateState(state);
  viewRef.current?.setProps(buildProps(restProps, viewRef));

  useEffect(() => {
    // Bootstrap the editor on first render. Note: running
    // non-initial renders inside `useEffect` produced glitchy
    // behavior.
    const view = new EditorView(root.current, {
      state: initialProps.current.state,
      ...buildProps(initialProps.current, viewRef),
    });

    viewRef.current = view;

    return () => {
      view.destroy();
    };
  }, []);

  useImperativeHandle(ref, () => ({
    get view() {
      return viewRef.current;
    },
  }));

  return <div ref={root} style={props.style} className={props.className} />;
});
