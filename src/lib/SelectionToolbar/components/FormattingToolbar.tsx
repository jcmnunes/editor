import React from 'react';
import { ToolbarButton } from './ToolbarButton';
import { isMarkActive } from '../../utils/isMarkActive';
import { setBlockType, toggleMark } from 'prosemirror-commands';
import { Separator } from './Separator';
import { isNodeActive } from '../../utils/isNodeActive';
import { toggleWrap } from '../../utils/toggleWrap';
import { toggleList } from '../../utils/toggleList';
import { EditorView } from 'prosemirror-view';
import { styled } from '@binarycapsule/ui-capsules';

export const Wrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  padding: '5px 8px',
});

interface Props {
  view: EditorView;
}

export const FormattingToolbar: React.FC<Props> = ({ view }) => {
  const { state, dispatch } = view;

  const {
    schema: { nodes, marks },
  } = state;

  return (
    <Wrapper onClick={() => view.focus()}>
      <ToolbarButton
        icon="bold"
        isActive={isMarkActive(state, marks.strong)}
        onClick={() => toggleMark(marks.strong)(state, dispatch)}
      />

      <ToolbarButton
        icon="italics"
        isActive={isMarkActive(state, marks.em)}
        onClick={() => toggleMark(marks.em)(state, dispatch)}
      />

      <ToolbarButton
        icon="strikethrough"
        isActive={isMarkActive(state, marks.strikethrough)}
        onClick={() => toggleMark(marks.strikethrough)(state, dispatch)}
      />

      <ToolbarButton
        icon="code-inline"
        isActive={isMarkActive(state, marks.code)}
        onClick={() => toggleMark(marks.code)(state, dispatch)}
      />

      <ToolbarButton
        icon="link"
        isActive={isMarkActive(state, marks.link)}
        onClick={() => toggleMark(marks.link, { href: '' })(state, dispatch)}
      />

      <Separator />

      <ToolbarButton
        icon="double-quotes"
        isActive={isNodeActive(nodes.blockquote, view.state)}
        onClick={() => toggleWrap(nodes.blockquote)(state, dispatch)}
      />

      <ToolbarButton
        icon="code"
        isActive={isNodeActive(nodes.code_block, view.state)}
        onClick={() => setBlockType(nodes.code_block)(state, dispatch)}
      />

      <Separator />

      <ToolbarButton
        icon="list-unordered"
        isActive={isNodeActive(nodes.bullet_list, view.state)}
        onClick={() => toggleList(nodes.bullet_list, nodes.list_item)(view.state, dispatch)}
      />

      <ToolbarButton
        icon="list_ordered"
        isActive={isNodeActive(nodes.ordered_list, view.state)}
        onClick={() => toggleList(nodes.ordered_list, nodes.list_item)(view.state, dispatch)}
      />

      <ToolbarButton
        icon="checkbox"
        isActive={isNodeActive(nodes.checkbox_list, view.state)}
        onClick={() => toggleList(nodes.checkbox_list, nodes.checkbox_item)(view.state, dispatch)}
      />
    </Wrapper>
  );
};
