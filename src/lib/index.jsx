import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Editor as SlateEditor } from 'slate-react';
import nodes from './nodes';
import marks from './marks';
import inlines from './inlines';
import createPlugins from './plugins';
import commands from './commands';
import queries from './queries';

export const StyledEditor = styled(SlateEditor)`
  font-weight: 400;
  color: #3e4c59;
  font-size: 16px;

  & > h1:first-child,
  & > h2:first-child,
  & > h3:first-child {
    margin-top: 0;
  }

  strong {
    font-weight: 700;
  }

  em {
    font-style: italic;
  }

  h1 {
    font-size: 28px;
    margin: 32px 0 16px;
    font-weight: 700;
    color: #323f4b;
  }

  h2 {
    font-size: 20px;
    font-weight: 700;
    color: #323f4b;
    margin: 18px 0 8px;
  }

  h3 {
    font-size: 18px;
    font-weight: 700;
    color: #323f4b;
    margin: 12px 0 6px;
  }

  ul {
    display: block;
    list-style-type: disc;
    margin: 10px 0;
    padding-left: 24px;
  }

  ol {
    display: block;
    list-style-type: decimal;
    margin: 10px 0;
    padding-left: 24px;
  }
`;

const Editor = ({ value, onChange, placeholder, className }) => {
  const plugins = useMemo(() => createPlugins({ placeholder }), [placeholder]);

  return (
    <StyledEditor
      value={value}
      onChange={({ value: val }) => onChange(val)}
      renderBlock={nodes}
      renderMark={marks}
      renderInline={inlines}
      plugins={plugins}
      commands={commands}
      queries={queries}
      className={className}
    />
  );
};

Editor.defaultProps = {
  placeholder: 'Enter some text here...',
  className: null,
};

Editor.propTypes = {
  placeholder: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.shape({}).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Editor;
