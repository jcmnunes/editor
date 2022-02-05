import React, { useCallback, useMemo, useState } from 'react';
import { ToolbarButton } from './ToolbarButton';
import { ToolbarInput } from './ToolbarInput';
import { Separator } from './Separator';
import { Mark } from 'prosemirror-model';
import { windowOpener } from '../../utils/windowOpener';
import { EditorView } from 'prosemirror-view';
import { isUrl } from '../../utils/isUrl';
import { TextSelection } from 'prosemirror-state';
import { styled } from '@binarycapsule/ui-capsules';

export const Wrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  padding: '5px 8px',
});

interface LinkToolbarProps {
  view: EditorView;
  mark: Mark;
  from: number;
  to: number;
}

export const LinkToolbar: React.FC<LinkToolbarProps> = ({ view, mark, from, to }) => {
  const [linkUrl, setLinkUrl] = useState(mark.attrs.href);

  const isLinkValid = useMemo(() => {
    return isUrl(linkUrl);
  }, [linkUrl]);

  const { state, dispatch } = view;

  const {
    attrs: { href },
  } = mark;

  const markType = state.schema.marks.link;

  const onCreateLink = useCallback(() => {
    const { tr } = state;

    if (isLinkValid) {
      const newTr = tr
        .removeMark(from, to, markType)
        .addMark(from, to, markType.create({ href: linkUrl }));

      const newSelection = new TextSelection(newTr.doc.resolve(to));

      dispatch(newTr.setSelection(newSelection));

      view.focus();
    }
  }, [dispatch, from, isLinkValid, linkUrl, markType, state, to, view]);

  const onRemoveLink = useCallback(() => {
    const { tr } = state;

    const newTr = tr.removeMark(from, to, mark);

    const newSelection = new TextSelection(newTr.doc.resolve(to));

    dispatch(newTr.setSelection(newSelection));

    view.focus();
  }, [dispatch, from, mark, state, to, view]);

  return (
    <Wrapper>
      <ToolbarInput
        value={linkUrl}
        onChange={e => setLinkUrl(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            e.preventDefault();

            onCreateLink();
          }
        }}
      />

      <Separator />

      {!!href && (
        <ToolbarButton
          icon="external-link"
          onClick={() => windowOpener(href)}
          style={{ marginLeft: 4 }}
        />
      )}

      <ToolbarButton icon="bin" onClick={onRemoveLink} />
    </Wrapper>
  );
};
