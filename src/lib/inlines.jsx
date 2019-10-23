import * as React from 'react';
import { Anchor } from '@binarycapsule/ui-capsules';

function renderInline(props, editor, next) {
  const { children, attributes } = props;

  switch (props.node.type) {
    case 'link': {
      const href = props.node.data.get('url');
      return (
        <Anchor {...attributes} href={props.node.data.get('url')} onClick={() => window.open(href)}>
          {children}
        </Anchor>
      );
    }
    default:
      return next();
  }
}

export default renderInline;
