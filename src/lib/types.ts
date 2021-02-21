import { EditorView } from 'prosemirror-view';

export interface EditorRef {
  view: EditorView;
  value: string;
}
