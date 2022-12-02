import React, { useMemo, createRef, MutableRefObject } from 'react';

// https://www.npmjs.com/package/@toast-ui/react-editor
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
// https://leego.tistory.com/entry/React-%EC%97%90%EB%94%94%ED%84%B0%EB%A1%9C-TOAST-UI-Editor-%EC%82%AC%EC%9A%A9%ED%95%B4%EB%B3%B4%EA%B8%B0
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/i18n/ko-kr';

export default function EditorWrite() {
  const editorRef = createRef() as MutableRefObject<Editor>;
  const clickHandler = () => {
    editorRef.current.getRootElement().classList.add('my-editor-root');
  };
  return (
    <>
      <Editor
        initialValue='hello react editor world!'
        previewStyle='vertical'
        height='600px'
        initialEditType='wysiwyg' // wysiwyg
        hideModeSwitch={true}
        useCommandShortcut={true}
        plugins={[colorSyntax]}
        language='ko-KR'
      />
      <button onClick={clickHandler}> TEST BUTTON </button>
    </>
  );
}