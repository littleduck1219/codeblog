"use client";

import React, { ChangeEventHandler, useRef, useState } from "react";

import { $createLinkNode } from "@lexical/link";
import { $createListItemNode, $createListNode } from "@lexical/list";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { $createHeadingNode, $createQuoteNode } from "@lexical/rich-text";
import { $createParagraphNode, $createTextNode, $getRoot } from "lexical";
import { useSettings } from "./__components/context/SettingsContext";
import { SharedAutocompleteContext } from "./__components/context/SharedAutocompleteContext";
import { SharedHistoryContext } from "./__components/context/SharedHistoryContext";
import Editor from "./__components/Editor";
import PlaygroundNodes from "./__components/nodes/PlaygroundNodes";
import { TableContext } from "./__components/plugins/TablePlugin";
import TypingPerfPlugin from "./__components/plugins/TypingPerfPlugin";
import PlaygroundEditorTheme from "./__components/themes/PlaygroundEditorTheme";

function Page() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const textRef = useRef(null);
  const onChangeTitle: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.target.value);
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    console.log("제목 : ", title);
    console.log("내용 : ", content);
  };

  useEffect(() => {
    // document를 사용하는 코드
  }, []);

  function prepopulatedRichText() {
    const root = $getRoot();
    if (root.getFirstChild() === null) {
      const heading = $createHeadingNode("h1");
      heading.append($createTextNode("Welcome to the playground"));
      root.append(heading);
      const quote = $createQuoteNode();
      quote.append(
        $createTextNode(
          `In case you were wondering what the black box at the bottom is – it's the debug view, showing the current state of the editor. ` +
            `You can disable it by pressing on the settings control in the bottom-left of your screen and toggling the debug view setting.`,
        ),
      );
      root.append(quote);
      const paragraph = $createParagraphNode();
      paragraph.append(
        $createTextNode("The playground is a demo environment built with "),
        $createTextNode("@lexical/react").toggleFormat("code"),
        $createTextNode("."),
        $createTextNode(" Try typing in "),
        $createTextNode("some text").toggleFormat("bold"),
        $createTextNode(" with "),
        $createTextNode("different").toggleFormat("italic"),
        $createTextNode(" formats."),
      );
      root.append(paragraph);
      const paragraph2 = $createParagraphNode();
      paragraph2.append(
        $createTextNode(
          "Make sure to check out the various plugins in the toolbar. You can also use #hashtags or @-mentions too!",
        ),
      );
      root.append(paragraph2);
      const paragraph3 = $createParagraphNode();
      paragraph3.append(
        $createTextNode(
          `If you'd like to find out more about Lexical, you can:`,
        ),
      );
      root.append(paragraph3);
      const list = $createListNode("bullet");
      list.append(
        $createListItemNode().append(
          $createTextNode(`Visit the `),
          $createLinkNode("https://lexical.dev/").append(
            $createTextNode("Lexical website"),
          ),
          $createTextNode(` for documentation and more information.`),
        ),
        $createListItemNode().append(
          $createTextNode(`Check out the code on our `),
          $createLinkNode("https://github.com/facebook/lexical").append(
            $createTextNode("GitHub repository"),
          ),
          $createTextNode(`.`),
        ),
        $createListItemNode().append(
          $createTextNode(`Playground code can be found `),
          $createLinkNode(
            "https://github.com/facebook/lexical/tree/main/packages/lexical-playground",
          ).append($createTextNode("here")),
          $createTextNode(`.`),
        ),
        $createListItemNode().append(
          $createTextNode(`Join our `),
          $createLinkNode("https://discord.com/invite/KmG4wQnnD9").append(
            $createTextNode("Discord Server"),
          ),
          $createTextNode(` and chat with the team.`),
        ),
      );
      root.append(list);
      const paragraph4 = $createParagraphNode();
      paragraph4.append(
        $createTextNode(
          `Lastly, we're constantly adding cool new features to this playground. So make sure you check back here when you next get a chance :).`,
        ),
      );
      root.append(paragraph4);
    }
  }

  const {
    settings: { isCollab, emptyEditor, measureTypingPerf },
  } = useSettings();

  const initialConfig = {
    editorState: isCollab
      ? null
      : emptyEditor
        ? undefined
        : prepopulatedRichText,
    namespace: "Playground",
    nodes: [...PlaygroundNodes],
    onError: (error: Error) => {
      throw error;
    },
    theme: PlaygroundEditorTheme,
  };

  return (
    <form className="postForm" onSubmit={onSubmit}>
      <div className="postForm__titleInputSection">
        <input
          className="postForm__titleInput"
          type="text"
          name="title"
          value={title}
          onChange={onChangeTitle}
          placeholder={"제목을 입력하세요."}
        />
      </div>
      <div className="postForm__editorWrapper">
        <LexicalComposer initialConfig={initialConfig}>
          <SharedHistoryContext>
            <TableContext>
              <SharedAutocompleteContext>
                <div className="editor-shell">
                  <Editor />
                </div>
                {/*{isDevPlayground ? <DocsPlugin /> : null}*/}
                {/*{isDevPlayground ? <PasteLogPlugin /> : null}*/}
                {/*{isDevPlayground ? <TestRecorderPlugin /> : null}*/}

                {measureTypingPerf ? <TypingPerfPlugin /> : null}
              </SharedAutocompleteContext>
            </TableContext>
          </SharedHistoryContext>
        </LexicalComposer>
      </div>
      <button>작성하기</button>
    </form>
  );
}

export default Page;
