import * as React from 'react';
import InlineCode from './components/InlineCode';

function renderMark(props, editor, next) {
  switch (props.mark.type) {
    case 'code':
      return <InlineCode {...props}>{props.children}</InlineCode>;
    case 'bold':
      return <strong>{props.children}</strong>;
    case 'italic':
      return <em>{props.children}</em>;
    default:
      return next();
  }
}

export default renderMark;
