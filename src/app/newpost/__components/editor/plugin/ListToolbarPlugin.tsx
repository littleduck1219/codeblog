import React, { ReactElement } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from "@lexical/list";

type listTag = "ol" | "ul";

export default function ListToolbarPlugin(): ReactElement {
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
