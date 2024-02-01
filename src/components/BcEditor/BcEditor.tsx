import React from 'react';
import { Box, Button, Flex, IconButton, Tooltip } from '@binarycapsule/ui-capsules';
import { Editor } from '../../lib';
import { EditorWrapper, StyledBcEditor } from './BcEditor.styles';
import { useBcEditor } from './useBcEditor';

export const BcEditor = () => {
  const { state, refs, handlers } = useBcEditor();

  return (
    <StyledBcEditor>
      <Flex justify="between">
        {!state.isReadonly ? (
          <Box>
            <Tooltip label="Log the current editor's value and the EditorView object">
              <Button onClick={handlers.onDebug} leftIcon="lightning" style={{ marginRight: 12 }}>
                Debug
              </Button>
            </Tooltip>

            <Tooltip label="Reset the editor value">
              <IconButton icon="refresh" variant="secondary" onClick={handlers.onResetValue} />
            </Tooltip>
          </Box>
        ) : (
          <div />
        )}

        <Box>
          {state.isReadonly ? (
            <Button onClick={() => state.setIsReadonly(false)} variant="primary" leftIcon="pencil">
              Edit
            </Button>
          ) : (
            <>
              <Button onClick={handlers.onCancel} variant="ghostGray" style={{ marginRight: 8 }}>
                Cancel
              </Button>

              <Button onClick={handlers.handleSave} variant="primary">
                Save
              </Button>
            </>
          )}
        </Box>
      </Flex>

      <EditorWrapper style={{ marginTop: 16 }}>
        <Editor
          key={state.editorKey}
          ref={refs.editorRef}
          defaultValue={state.savedValue}
          isReadonly={state.isReadonly}
          onChange={handlers.handleChange}
        />
      </EditorWrapper>
    </StyledBcEditor>
  );
};
