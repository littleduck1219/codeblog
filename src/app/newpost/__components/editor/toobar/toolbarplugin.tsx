import React, { ReactElement } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import HeadingPlugin from "@/app/newpost/__components/editor/plugin/HeadingToolbarPlugin";
import ListToolbarPlugin from "@/app/newpost/__components/editor/plugin/ListToolbarPlugin";

export default function ToolbarPlugin(): ReactElement {
  const [editor] = useLexicalComposerContext();

  return (
    <div className="toolbar-wrapper">
      <HeadingPlugin />
      <ListToolbarPlugin />
    </div>
  );
}
