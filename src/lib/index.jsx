import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Editor as SlateEditor } from 'slate-react';
import { theme } from '@binarycapsule/ui-capsules';
import nodes from './nodes';
import marks from './marks';
import inlines from './inlines';
import createPlugins from './plugins';
import commands from './commands';
import queries from './queries';

export const StyledEditor = styled(SlateEditor)`
  padding: 24px;
  font-weight: 400;
  color: ${theme.neutral700};
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
    color: ${theme.neutral800};
  }

  h2 {
    font-size: 20px;
    font-weight: 700;
    color: ${theme.neutral800};
    margin: 18px 0 8px;
  }

  h3 {
    font-size: 18px;
    font-weight: 700;
    color: ${theme.neutral800};
    margin: 12px 0 6px;
  }

  ul {
    display: block;
    list-style-type: disc;
    margin: 10px 0;
    padding-left: 40px;
  }

  ol {
    display: block;
    list-style-type: decimal;
    margin: 10px 0;
    padding-left: 40px;
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
