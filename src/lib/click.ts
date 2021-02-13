import { Plugin, TextSelection } from 'prosemirror-state';
import { Schema } from 'prosemirror-model';
import { isMarkActive } from './utils/isMarkActive';
import { getMarkRange } from './utils/getMarkRange';

export const click = (schema: Schema) =>
  new Plugin({
    props: {
      handleClick: view => {
        const { state } = view;

        const { marks } = schema;

        const isLink = isMarkActive(state, marks.link);

        if (!isLink) {
          return false;
        }

        const range = getMarkRange(state.selection.$from, marks.link);

        if (range) {
          const $start = state.doc.resolve(range.from);
          const $end = state.doc.resolve(range.to);

          view.dispatch(state.tr.setSelection(new TextSelection($start, $end)));

          return true;
        }

        return false;
      },
    },
  });
