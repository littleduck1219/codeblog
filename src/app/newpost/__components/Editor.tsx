import React, { useCallback, useEffect, useState } from "react";
import classNames from "classnames";
import { useEditor, EditorContent, Editor, BubbleMenu } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Link from "@tiptap/extension-link";
import Bold from "@tiptap/extension-bold";
import Underline from "@tiptap/extension-underline";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Code from "@tiptap/extension-code";
import History from "@tiptap/extension-history";
import Image from "@tiptap/extension-image";
import Dropcursor from "@tiptap/extension-dropcursor";
// Custom
import * as Icons from "./Icons";
import content from "./Content";
import { LinkModal } from "./LinkModal";
import "./editor.scss";

type TextBlock = {
  type: string;
  text?: string;
};

type Block = {
  type: string;
  content?: TextBlock[];
};

type EditorJson = {
  type: string;
  content?: Block[];
};

type PopupEditorProps = {
  onChangeContent: (newContent: string) => void;
};

export function PopupEditor({ onChangeContent }: PopupEditorProps) {
  const editor = useEditor({
    extensions: [
      Document,
      History,
      Paragraph,
      Text,
      Image,
      Dropcursor,
      Link.configure({
        openOnClick: false,
      }),
      Bold,
      Underline,
      Italic,
      Strike,
      Code,
    ],
    content,
  }) as Editor;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState<string>("");
  const [isAddingImage, setIsAddingImage] = useState(false);

  const openModal = useCallback(() => {
    setUrl(editor.getAttributes("link").href);
    setIsOpen(true);
  }, [editor]);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setUrl("");
  }, []);

  const saveLink = useCallback(() => {
    if (url) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url, target: "_blank" })
        .run();
    } else {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    }
    editor.commands.blur();
    closeModal();
  }, [editor, url, closeModal]);

  const removeLink = useCallback(() => {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    closeModal();
  }, [editor, closeModal]);

  const toggleBold = useCallback(() => {
    editor.chain().focus().toggleBold().run();
  }, [editor]);

  const toggleUnderline = useCallback(() => {
    editor.chain().focus().toggleUnderline().run();
  }, [editor]);

  const toggleItalic = useCallback(() => {
    editor.chain().focus().toggleItalic().run();
  }, [editor]);

  const toggleStrike = useCallback(() => {
    editor.chain().focus().toggleStrike().run();
  }, [editor]);

  const toggleCode = useCallback(() => {
    editor.chain().focus().toggleCode().run();
  }, [editor]);

  // extend Image
  const addImage = useCallback(() => {
    const url = window.prompt("URL");
    if (url === null) {
      return;
    }
    if (url === "") {
      editor.chain().focus().extendMarkRange("image").clearContent().run();
      return;
    }

    setIsAddingImage(true);
    editor.chain().focus().setImage({ src: url }).run();
    setIsAddingImage(false);
  }, [editor]);

  useEffect(() => {
    if (!editor) return;

    const handleUpdate = () => {
      if (isAddingImage) return;

      const jsonContent = editor.getJSON();
      const xmlContent = editor.getHTML();
      const extractedText = extractTextFromJson(jsonContent as EditorJson);
      onChangeContent(xmlContent);
    };

    editor.on("update", handleUpdate);
    return () => {
      editor.off("update", handleUpdate);
    };
  }, [editor, onChangeContent, isAddingImage]);

  const extractTextFromJson = (json: EditorJson) => {
    let extractedText = "";

    json?.content?.forEach((block: Block) => {
      if (block.type === "paragraph" && block.content) {
        block.content.forEach((textBlock: TextBlock) => {
          if (textBlock.type === "text" && textBlock.text) {
            extractedText += textBlock.text + " ";
          }
        });
      }
    });
    return extractedText.trim();
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="editor editor-mini">
      <BubbleMenu
        pluginKey="bubbleMenuText"
        className="bubble-menu-dark"
        tippyOptions={{ duration: 150 }}
        editor={editor}
        shouldShow={({ editor, view, state, oldState, from, to }) => {
          return from !== to;
        }}
      >
        <button
          className="menu-button"
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <Icons.RotateLeft />
        </button>
        <button
          className="menu-button"
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <Icons.RotateRight />
        </button>
        <button
          className={classNames("menu-button", {
            "is-active": editor.isActive("link"),
          })}
          type="button"
          onClick={openModal}
        >
          <Icons.Link />
        </button>
        <button
          className={classNames("menu-button", {
            "is-active": editor.isActive("bold"),
          })}
          type="button"
          onClick={toggleBold}
        >
          <Icons.Bold />
        </button>
        <button
          className={classNames("menu-button", {
            "is-active": editor.isActive("underline"),
          })}
          type="button"
          onClick={toggleUnderline}
        >
          <Icons.Underline />
        </button>
        <button
          className={classNames("menu-button", {
            "is-active": editor.isActive("intalic"),
          })}
          type="button"
          onClick={toggleItalic}
        >
          <Icons.Italic />
        </button>
        <button
          className={classNames("menu-button", {
            "is-active": editor.isActive("strike"),
          })}
          type="button"
          onClick={toggleStrike}
        >
          <Icons.Strikethrough />
        </button>
        <button
          className={classNames("menu-button", {
            "is-active": editor.isActive("code"),
          })}
          type="button"
          onClick={toggleCode}
        >
          <Icons.Code />
        </button>
        <button
          className={classNames("menu-button", {
            "is-active": editor.isActive("image"),
          })}
          type="button"
          onClick={addImage}
        >
          <Icons.Code />
        </button>
      </BubbleMenu>

      <BubbleMenu
        pluginKey="bubbleMenuLink"
        className="bubble-menu-dark"
        tippyOptions={{ duration: 150 }}
        editor={editor}
        shouldShow={({ editor, view, state, oldState, from, to }) => {
          // only show the bubble menu for links.
          return from === to && editor.isActive("link");
        }}
      >
        <button className="button" type="button" onClick={openModal}>
          Edit
        </button>
        <button className="button-remove" type="button" onClick={removeLink}>
          Remove
        </button>
      </BubbleMenu>

      <EditorContent editor={editor} />

      <LinkModal
        url={url}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Link Modal"
        closeModal={closeModal}
        onChangeUrl={(e) => setUrl(e.target.value)}
        onSaveLink={saveLink}
        onRemoveLink={removeLink}
      />
    </div>
  );
}
