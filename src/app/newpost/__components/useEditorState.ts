import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Editor } from "@tiptap/react";
import { EditorJson } from "@/model";

export const useEditorState = (
  editor: Editor,
): [string, Dispatch<SetStateAction<string>>] => {
  const [content, setContent] = useState("");

  useEffect(() => {
    if (!editor) return;

    const handleUpdate = () => {
      const xmlContent = editor.getHTML();
      setContent(xmlContent);
    };

    editor.on("update", handleUpdate);
    return () => {
      editor.off("update", handleUpdate);
    };
  }, [editor]);

  return [content, setContent];
};
