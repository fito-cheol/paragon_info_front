import React, { createRef, MutableRefObject, useEffect } from 'react';
import { upload } from 'api/s3/index';

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
    console.log('Utube upload link button');
  };

  return (
    <>
      <Editor
        ref={editorRef}
        initialValue='hello react editor world!'
        previewStyle='vertical'
        height='600px'
        initialEditType='wysiwyg' // wysiwyg
        hideModeSwitch={true}
        useCommandShortcut={true}
        plugins={[colorSyntax]}
        language='ko-KR'
        hooks={{
          addImageBlobHook: async (blob, callback) => {
            console.log(blob); // File {name: '카레유.png', ... }
            if (blob.size > 20971520) {
              // Error Dialog 발생
              console.warn('이미지 파일 크기가 20MB가 넘습니다');
              return;
            }
            // 1. 첨부된 이미지 파일을 서버로 전송후, 이미지 경로 url을 받아온다.
            const result = await upload({ file: blob }); //  서버 전송 / 경로 수신 코드 ...
            console.log(result);
            if (result.status == 200) {
              callback(result.data.Location, '');
            }
            // 2. 첨부된 이미지를 화면에 표시(경로는 임의로 넣었다.)
          },
        }}
      />
      <button onClick={clickHandler}> TEST BUTTON </button>
    </>
  );
}
