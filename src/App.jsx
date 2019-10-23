import React, { useState } from 'react';
import styled from 'styled-components';
import { Value } from 'slate';
import { Button } from '@binarycapsule/ui-capsules';
import Editor from './lib/index';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 48px;
  min-height: 100vh;
  min-width: 100vw;
  background: ${props => props.theme.neutral050};
`;

export const Container = styled.div`
  width: 700px;
`;

export const Heading = styled.h1`
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 32px;
`;

export const StyledEditor = styled(Editor)`
  background: #fff;
  border-radius: 8px;
  min-height: 300px;
`;

const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            text: '',
          },
        ],
      },
    ],
  },
});

const App = () => {
  const [value, setValue] = useState(initialValue);

  return (
    <Wrapper>
      <Container>
        <Heading>Editor</Heading>
        <StyledEditor placeholder="Enter some text here..." value={value} onChange={setValue} />
        <div style={{ marginTop: 32 }}>
          <Button onClick={() => console.log('👉', value)}>Log Value</Button>
        </div>
      </Container>
    </Wrapper>
  );
};

export default App;
