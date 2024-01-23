"use client";

import React, { useEffect } from "react";
import "../../newPost.scss";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { EditorState } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

const theme = {};

function onError(error: Error) {
  console.error(error);
}

function MyOnChangePlugin(props: {
  onChange: (editorState: EditorState) => void;
}): null {
  const [editor] = useLexicalComposerContext();
  const { onChange } = props;

  useEffect(() => {
    return editor.registerUpdateListener((updateEvent) => {
      const editorState = updateEvent.editorState;
      onChange(editorState);
    });
  }, [onChange, editor]);

  return null;
}

function Editor({}: props) {
  const initialConfig = {
    namespace: "MyEditor",
    theme,
    onError,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <PlainTextPlugin
        contentEditable={
          <ContentEditable className="postForm__containerEditable" />
        }
        placeholder={
          <div className="postForm__placeholder">Enter some text...</div>
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
      <MyOnChangePlugin
        onChange={(editorState) => {
          console.log(editorState);
        }}
      />
      <HistoryPlugin />
    </LexicalComposer>
  );
}

export default Editor;
