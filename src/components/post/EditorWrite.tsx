import React, { createRef, MutableRefObject } from 'react';
import Button from '@mui/material/Button';

// https://www.npmjs.com/package/@toast-ui/react-editor
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
// https://leego.tistory.com/entry/React-%EC%97%90%EB%94%94%ED%84%B0%EB%A1%9C-TOAST-UI-Editor-%EC%82%AC%EC%9A%A9%ED%95%B4%EB%B3%B4%EA%B8%B0
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';

import { uploadImage } from 'api/s3/index';

interface Props {
  initialValue?: string;
  onChange?: (text: string) => void;
}

export default function EditorWrite({ initialValue, onChange }: Props) {
  const editorRef = createRef() as MutableRefObject<Editor>;

  const clickHandler = () => {
    const markDownData = editorRef.current.getInstance().getMarkdown();
  };
  const onChangeHandler = () => {
    if (onChange) {
      const markDownData = editorRef.current.getInstance().getMarkdown();
      onChange(markDownData);
    }
  };

  return (
    <>
      <Editor
        ref={editorRef}
        initialValue={initialValue ? initialValue : ' '}
        previewStyle='vertical'
        height='600px'
        initialEditType='wysiwyg' // wysiwyg
        theme='dark'
        hideModeSwitch={true}
        useCommandShortcut={true}
        plugins={[colorSyntax]}
        language='ko-KR'
        onChange={onChangeHandler}
        customHTMLRenderer={{
          htmlBlock: {
            iframe(node: any) {
              return [
                {
                  type: 'openTag',
                  tagName: 'iframe',
                  outerNewLine: true,
                  attributes: node.attrs,
                },
                { type: 'html', content: node.childrenHTML },
                { type: 'closeTag', tagName: 'iframe', outerNewLine: true },
              ];
            },
          },
          htmlInline: {
            big(node, { entering }) {
              return entering
                ? { type: 'openTag', tagName: 'big', attributes: node.attrs }
                : { type: 'closeTag', tagName: 'big' };
            },
          },
        }}
        hooks={{
          addImageBlobHook: async (blob, callback) => {
            console.log(blob); // File {name: '카레유.png', ... }
            if (blob.size > 20971520) {
              // Error Dialog 발생
              console.warn('이미지 파일 크기가 20MB가 넘습니다');
              return;
            }
            try {
              // 1. 첨부된 이미지 파일을 서버로 전송후, 이미지 경로 url을 받아온다.
              const result = await uploadImage({ file: blob }); //  서버 전송 / 경로 수신 코드 ...
              callback(result.data.Location, '');
            } catch (error) {
              console.error(error);
            }
          },
        }}
      />
      <Button variant='outlined' onClick={clickHandler}>
        TEST BUTTON
      </Button>
    </>
  );
}
