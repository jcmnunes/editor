import React, { useEffect } from 'react';
import { useState } from 'react';
import styled from '@emotion/styled';
import { Button, theme, ThemeProvider, Box } from '@binarycapsule/ui-capsules';
import { EditorView } from 'prosemirror-view';
import { Editor } from './lib';

const defaultValue = ``;

const EditorWrapper = styled(Box)({
  width: 500,
  border: '1px solid black',
  height: 300,
});

function App() {
  const [readonly, setReadonly] = useState(false);
  const editorRef = React.useRef<{ view: EditorView; value: string }>();

  useEffect(() => {
    if (!readonly) {
      editorRef.current?.view.focus();
    }
  }, [readonly]);

  return (
    <ThemeProvider theme={theme}>
      <Box p="24">
        <Button
          onClick={() => {
            // eslint-disable-next-line
            console.log(editorRef.current?.value);

            // eslint-disable-next-line
            console.log(editorRef.current?.view);
          }}
          leftIcon="lightning"
          mr="12"
        >
          Debug
        </Button>

        <Button
          onClick={() => {
            if (readonly) {
              setReadonly(false);
            } else {
              setReadonly(true);
            }
          }}
          variant="ghost"
          leftIcon={readonly ? 'pencil' : undefined}
        >
          {readonly ? 'Edit' : 'Save'}
        </Button>

        <EditorWrapper mt="24">
          <Editor ref={editorRef} defaultValue={defaultValue} readonly={readonly} />
        </EditorWrapper>
      </Box>
    </ThemeProvider>
  );
}

export default App;
