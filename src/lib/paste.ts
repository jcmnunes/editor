import { Plugin } from 'prosemirror-state';
import { toggleMark } from 'prosemirror-commands';
import { isUrl } from './utils/isUrl';
import { Schema } from 'prosemirror-model';
import { parser } from './parser';
import isInCode from './utils/isInCode';

export const paste = (schema: Schema) =>
  new Plugin({
    props: {
      handlePaste: (view, event: ClipboardEvent) => {
        if (view.props.editable && !view.props.editable(view.state)) {
          return false;
        }
        if (!event.clipboardData) return false;

        const text = event.clipboardData.getData('text/plain');
        const html = event.clipboardData.getData('text/html');
        const { state, dispatch } = view;

        if (isUrl(text)) {
          if (!state.selection.empty) {
            toggleMark(schema.marks.link, { href: text })(state, dispatch);

            return true;
          }

          const transaction = view.state.tr
            .insertText(text, state.selection.from, state.selection.to)
            .addMark(
              state.selection.from,
              state.selection.to + text.length,
              state.schema.marks.link.create({ href: text }),
            );

          view.dispatch(transaction);

          return true;
        }

        // otherwise, if we have html on the clipboard then fallback to the
        // default HTML parser behavior that comes with Prosemirror.
        if (text.length === 0 || html) return false;

        event.preventDefault();

        if (isInCode(view.state)) {
          view.dispatch(view.state.tr.insertText(text));

          return true;
        }

        const parsed = parser.parse(text);

        const slice = parsed.slice(0);

        const transaction = view.state.tr.replaceSelection(slice);

        view.dispatch(transaction);

        return true;
      },
    },
  });
