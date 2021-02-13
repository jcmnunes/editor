import React, { useCallback, useEffect } from 'react';
import { useState } from 'react';
import styled from '@emotion/styled';
import { Button, theme, ThemeProvider, Box } from '@binarycapsule/ui-capsules';
import { EditorView } from 'prosemirror-view';
import { Editor } from './lib';

const defaultValue = `
# This is the title

Cras mattis consectetur purus sit amet fermentum. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Etiam porta sem malesuada magna mollis euismod. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.

## Heading level 2

Integer posuere erat a ante **venenatis dapibus** posuere velit aliquet. Duis mollis, est non *commodo luctus* nisi erat porttitor ligula, eget lacinia odio sem nec elit. Donec id elit non mi porta gravida at eget metus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus \`const x = '123'\`.

1. List item 1

2. asdasdas

3. asdasd

4. asddasd

* asdasd

* asdasd

* asdasd

- [ ] This is a task
- [x] Action item completed
- [ ] Do this

Donec sed odio dui. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.

[Testing](https://www.example.org/)
[https://www.example.com/](https://www.example.com/)

### Heading level 3

Donec sed odio dui. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet.

\`\`\`
useEffect(() => {
  viewRef.current?.update({
    ...viewRef.current?.props,
    editable: () => !readonly,
  });
}, [readonly]);
\`\`\`

Integer posuere erat a ~~ante venenatis~~ dapibus posuere velit aliquet. Cras mattis consectetur purus sit amet fermentum. Donec sed odio dui. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam porta sem malesuada magna mollis euismod. Nullam quis risus eget urna mollis ornare vel eu leo. Aenean lacinia bibendum nulla sed consectetur.`;

const EditorWrapper = styled(Box)(({ theme }) => ({
  width: 500,
  border: `1px solid ${theme.colors.neutral['200']}`,
  height: 850,
  borderRadius: 4,
  overflow: 'hidden',
}));

function App() {
  const [readonly, setReadonly] = useState(false);
  const editorRef = React.useRef<{ view: EditorView; value: string }>();

  useEffect(() => {
    if (!readonly) {
      editorRef.current?.view.focus();
    }
  }, [readonly]);

  const handleChange = useCallback(val => {
    // eslint-disable-next-line no-console
    console.log(val);
  }, []);

  const handleSave = useCallback(() => {
    const val = editorRef.current?.value;

    // eslint-disable-next-line no-console
    console.log(val);
  }, []);

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

              handleSave();
            }
          }}
          variant="ghost"
          leftIcon={readonly ? 'pencil' : undefined}
        >
          {readonly ? 'Edit' : 'Save'}
        </Button>

        <EditorWrapper mt="24">
          <Editor
            ref={editorRef}
            defaultValue={defaultValue}
            readonly={readonly}
            onChange={handleChange}
          />
        </EditorWrapper>
      </Box>
    </ThemeProvider>
  );
}

export default App;
