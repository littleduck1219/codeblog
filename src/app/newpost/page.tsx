"use client";

import React, { ChangeEventHandler, useEffect, useState } from "react";
import { Editor } from "@/app/newpost/__components";
import "./newPost.scss";
import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/app/store/user";

function Page({ props }: any) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();
  const user = useUserStore((state) => state.user);

  const onChangeTitle: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.target.value);
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    console.log("제목 : ", title);
    console.log("내용 : ", content);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // 로그인 페이지로 리다이렉트
        router.replace("/");
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (!user) return router.replace("/");
  else {
  }
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
        <Editor />
      </div>
      <button>작성하기</button>
    </form>
  );
}

export default Page;
