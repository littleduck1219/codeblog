"use client";

import React, { ChangeEventHandler, useMemo, useRef, useState } from "react";
import "./newPost.scss";
import "react-quill/dist/quill.snow.css";
import ReactQuill, { UnprivilegedEditor } from "react-quill";
import { DeltaStatic, Sources } from "quill";

function Page() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const textRef = useRef(null);
  const onChangeTitle: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.target.value);
  };

  const onChangeContent = (
    content: string,
    delta: DeltaStatic,
    source: Sources,
    editor: UnprivilegedEditor,
  ) => {
    setContent(content);
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "align",
    "strike",
    "script",
    "blockquote",
    "background",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "code-block",
  ];

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          // [{ size: ["small", false, "large", "huge"] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ font: [] }],
          [
            "bold",
            "italic",
            "underline",
            "strike",
            { color: [] },
            { background: [] },
          ],
          [{ align: [] }],

          ["blockquote", "code-block"],

          // [{ header: 1 }, { header: 2 }],
          [{ list: "ordered" }, { list: "bullet" }],
          // [{ script: "sub" }, { script: "super" }],
          [{ indent: "-1" }, { indent: "+1" }],
          // [{ direction: "rtl" }],

          // ["clean"],
          ["image", "video"],
        ],
        // handlers: {
        //   image: imageHandler,
        // },
      },
    }),
    [],
  );

  // const quill = new Quill("#quill-container", {
  //   modules: {
  //     toolbar: {
  //       container: [
  //         // [{ size: ["small", false, "large", "huge"] }],
  //         [{ header: [1, 2, 3, 4, 5, 6, false] }],
  //         [{ font: [] }],
  //         [
  //           "bold",
  //           "italic",
  //           "underline",
  //           "strike",
  //           { color: [] },
  //           { background: [] },
  //         ],
  //         [{ align: [] }],
  //
  //         ["blockquote", "code-block"],
  //
  //         // [{ header: 1 }, { header: 2 }],
  //         [{ list: "ordered" }, { list: "bullet" }],
  //         // [{ script: "sub" }, { script: "super" }],
  //         [{ indent: "-1" }, { indent: "+1" }],
  //         // [{ direction: "rtl" }],
  //
  //         // ["clean"],
  //         ["image", "video"],
  //       ],
  //       // handlers: {
  //       //   image: imageHandler,
  //       // },
  //     },
  //   },
  // });

  return (
    <form className="postForm">
      <div className="postForm__titleInputSection">
        <input
          className="postForm__titleInput"
          type="text"
          name="title"
          value={title}
          onChange={onChangeTitle}
          placeholder={"제목을 입력하세요."}
        />
        <div id="postForm__textArea">
          <ReactQuill
            ref={textRef}
            modules={modules}
            formats={formats}
            theme="snow"
            scrollingContainer="#scrolling-container"
            onChange={onChangeContent}
          />
        </div>
      </div>
    </form>
  );
}

export default Page;
