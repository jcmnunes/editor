import * as React from 'react';

function renderNode(props, editor, next) {
  const { children, attributes } = props;

  switch (props.node.type) {
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>;
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>;
    case 'ordered-list':
      return <ol {...attributes}>{props.children}</ol>;
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>;
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>;
    case 'heading-three':
      return <h3 {...attributes}>{children}</h3>;
    case 'list-item':
      return <li {...attributes}>{children}</li>;
    default:
      return next();
  }
}

export default renderNode;
