import React, { useCallback, useEffect, useState } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { defaultValue } from './defaultValue';
import { EditorRef } from '../../lib';

export const useBcEditor = () => {
  const [isReadonly, setIsReadonly] = useState(false);

  const [savedValue, setSavedValue] = useLocalStorage('bcEditor', defaultValue);

  const editorRef = React.useRef<EditorRef>(null);

  const [editorKey, setEditorKey] = useState(Date.now());

  useEffect(() => {
    if (!isReadonly && editorRef.current?.view) {
      editorRef.current.view.focus();
    }
  }, [isReadonly]);

  const handleChange = useCallback(val => {
    if (!window.onbeforeunload) {
      window.onbeforeunload = () => 'Unsaved changes';
    }

    // eslint-disable-next-line no-console
    console.log(val);
  }, []);

  const handleSave = useCallback(() => {
    setIsReadonly(true);

    const val = editorRef.current?.value;

    setSavedValue(val);

    window.onbeforeunload = null;
  }, [setSavedValue]);

  const onCancel = useCallback(() => {
    setIsReadonly(true);

    setSavedValue(savedValue);

    setEditorKey(Date.now());

    window.onbeforeunload = null;
  }, [savedValue, setSavedValue]);

  const onDebug = useCallback(() => {
    // eslint-disable-next-line
    console.log(editorRef.current?.value);

    // eslint-disable-next-line
    console.log(editorRef.current?.view);
  }, []);

  const onResetValue = useCallback(() => {
    setSavedValue(defaultValue);

    setEditorKey(Date.now());
  }, [setSavedValue]);

  return {
    state: {
      isReadonly,
      setIsReadonly,
      editorKey,
      setEditorKey,
      savedValue,
      setSavedValue,
    },

    refs: {
      editorRef,
    },

    handlers: {
      handleChange,
      handleSave,
      onCancel,
      onDebug,
      onResetValue,
    },
  };
};
