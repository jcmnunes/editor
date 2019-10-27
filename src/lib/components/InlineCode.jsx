import styled from 'styled-components';
import { theme } from '@binarycapsule/ui-capsules';

const InlineCode = styled.code.attrs({
  spellCheck: false,
})`
  background: ${theme.neutral050};
  border-radius: 4px;
  border: 1px solid ${theme.neutral100};
  padding: 2px 4px;
  font-family: 'Hack', Menlo, monospace;
  font-size: 85%;
`;

export default InlineCode;
