import React, { createRef, MutableRefObject, useEffect } from 'react';

// https://velog.io/@ayoung0073/React-%ED%9E%98%EB%93%A4%EA%B2%8C-%EC%A0%81%EC%9A%A9%ED%95%9C-TOAST-UI-Viewer-Editor
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';

interface ReadProps {
  content: string;
}

export default function EditorRead({ content }: ReadProps) {
  const editorRef = createRef() as MutableRefObject<Viewer>;
  useEffect(() => {
    editorRef.current?.getInstance().setMarkdown(content);
  }, [content]);
  return <Viewer ref={editorRef} initialValue={content || ' '} theme='dark' />;
}
