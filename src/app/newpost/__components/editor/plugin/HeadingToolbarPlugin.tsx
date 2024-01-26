import React, { ReactElement } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection } from "lexical";
import { $setBlocksType } from "@lexical/selection";
import { $createHeadingNode } from "@lexical/rich-text";

type HeadingTag = "h1" | "h2" | "h3";

export default function HeadingPlugin(): ReactElement {
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
