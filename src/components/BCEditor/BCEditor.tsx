import React from 'react';
import { Box, Button, IconButton, Tooltip } from '@binarycapsule/ui-capsules';
import { MarginProps } from '@binarycapsule/ui-capsules/dist/styledProps';
import { Editor } from '../../lib';
import { EditorWrapper, StyledBCEditor } from './BCEditor.styles';
import { useBCEditor } from './useBCEditor';

export const BcEditor: React.FC<MarginProps> = () => {
  const { state, refs, handlers } = useBCEditor();

  return (
    <StyledBCEditor>
      <Box display="flex" justifyContent="space-between">
        {!state.isReadonly ? (
          <Box>
            <Tooltip content="Log the current editor's value and the EditorView object">
              <Button onClick={handlers.onDebug} leftIcon="lightning" mr="12">
                Debug
              </Button>
            </Tooltip>

            <Tooltip content="Reset the editor value">
              <IconButton
                icon="refresh"
                variant="outline"
                variantColor="primary"
                onClick={handlers.onResetValue}
              />
            </Tooltip>
          </Box>
        ) : (
          <div />
        )}

        <Box>
          {state.isReadonly ? (
            <Button onClick={() => state.setIsReadonly(false)} variant="outline" leftIcon="pencil">
              Edit
            </Button>
          ) : (
            <>
              <Button onClick={handlers.onCancel} variant="ghost" mr="8">
                Cancel
              </Button>

              <Button onClick={handlers.handleSave} variant="outline">
                Save
              </Button>
            </>
          )}
        </Box>
      </Box>

      <EditorWrapper mt="16">
        <Editor
          key={state.editorKey}
          ref={refs.editorRef}
          defaultValue={state.savedValue}
          isReadonly={state.isReadonly}
          onChange={handlers.handleChange}
        />
      </EditorWrapper>
    </StyledBCEditor>
  );
};
