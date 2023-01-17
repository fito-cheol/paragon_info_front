import React, { createRef, MutableRefObject, useEffect } from 'react';

// https://www.npmjs.com/package/@toast-ui/react-editor
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { HTMLMdNode } from '@toast-ui/editor/types';
import { toast } from 'react-toastify';

// https://leego.tistory.com/entry/React-%EC%97%90%EB%94%94%ED%84%B0%EB%A1%9C-TOAST-UI-Editor-%EC%82%AC%EC%9A%A9%ED%95%B4%EB%B3%B4%EA%B8%B0
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';

import { uploadImage } from 'api/s3/index';

interface Props {
  value?: string;
  onChange?: (text: string) => void;
}

// HTMLMdNode

export default function EditorWrite({ value, onChange }: Props) {
  const editorRef = createRef() as MutableRefObject<Editor>;

  const onChangeHandler = () => {
    if (onChange) {
      const markDownData = editorRef.current.getInstance().getMarkdown();
      onChange(markDownData);
    }
  };
  useEffect(() => {
    const markDownData = editorRef.current.getInstance().getMarkdown();
    if (value && value != markDownData) {
      editorRef.current.getInstance().setMarkdown(value);
    }
  }, [value]);

  return (
    <>
      <Editor
        ref={editorRef}
        initialValue={value ? value : ' '}
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
          // htmlBlock: {
          //   iframe(node: any) {
          //     return [
          //       {
          //         type: 'openTag',
          //         tagName: 'iframe',
          //         outerNewLine: true,
          //         attributes: node.attrs,
          //       },
          //       { type: 'html', content: node.childrenHTML },
          //       { type: 'closeTag', tagName: 'iframe', outerNewLine: true },
          //     ];
          //   },
          // },
          htmlInline: {
            big(node: HTMLMdNode, { entering }) {
              return entering
                ? { type: 'openTag', tagName: 'big', attributes: node.attrs }
                : { type: 'closeTag', tagName: 'big' };
            },
          },
        }}
        hooks={{
          addImageBlobHook: async (blob, callback) => {
            if (blob.size > 20971520) {
              toast.error('이미지 파일 크기가 20MB가 넘습니다');
              return;
            }
            try {
              const result = await uploadImage({ file: blob });
              callback(result.data.Location, '');
            } catch (error) {
              toast.error('이미지 첨부에 실패했습니다');
            }
          },
        }}
      />
    </>
  );
}
