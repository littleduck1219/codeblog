"use client";

import React, {
  MouseEventHandler,
  useEffect,
  MouseEvent,
  ReactElement,
} from "react";
import "./editor.scss";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HeadingNode, $createHeadingNode } from "@lexical/rich-text";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection } from "lexical";
import { $setBlocksType } from "@lexical/selection";
import { theme } from "@/app/newpost/__components/editor/Theme";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  ListItemNode,
  ListNode,
} from "@lexical/list";

type HeadingTag = "h1" | "h2" | "h3";
type listTag = "ol" | "ul";

function HeadingPlugin(): ReactElement {
  const [editor] = useLexicalComposerContext();
  const headingTag: HeadingTag[] = ["h1", "h2", "h3"];
  const onClick = (tag: HeadingTag): void => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode(tag));
      }
    });
  };
  return (
    <>
      {headingTag.map((tag) => (
        <button key={tag} onClick={() => onClick(tag)}>
          {tag.toUpperCase()}
        </button>
      ))}
    </>
  );
}

function ListToolbarPlugin(): ReactElement {
  const [editor] = useLexicalComposerContext();
  const listTag: listTag[] = ["ol", "ul"];
  const onClick = (tag: listTag): void => {
    if (tag === "ol") {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
      return;
    }
    editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
  };
  return (
    <>
      {listTag.map((tag: listTag) => (
        <button key={tag} onClick={() => onClick(tag)}>
          {tag.toUpperCase()}
        </button>
      ))}
    </>
  );
}

function ToolbarPlugin(): ReactElement {
  const [editor] = useLexicalComposerContext();

  return (
    <div className="toolbar-wrapper">
      <HeadingPlugin />
      <ListToolbarPlugin />
    </div>
  );
}
function onError(error: Error) {
  console.error(error);
}

function Editor(): React.ReactElement {
  const initialConfig = {
    namespace: "MyEditor",
    theme,
    onError,
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      // BannerNode
    ],
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <ToolbarPlugin />
      <ListPlugin />
      <RichTextPlugin
        contentEditable={<ContentEditable className="containerEditable" />}
        placeholder={<div className="placeholder">Enter some text...</div>}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
    </LexicalComposer>
  );
}

export default Editor;
