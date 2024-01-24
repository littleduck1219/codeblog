"use client";

import React, { ChangeEventHandler, useState } from "react";
import LexicalEditor from "@/app/newpost/LexicalEditor";

function Page({ props }: any) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const onChangeTitle: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.target.value);
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    console.log("제목 : ", title);
    console.log("내용 : ", content);
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
        <LexicalEditor />
      </div>
      <button>작성하기</button>
    </form>
  );
}

export default Page;
