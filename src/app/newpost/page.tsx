"use client";

import React, {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import "./newPost.scss";
import { auth, db, storage } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/app/store/user";
import { PopupEditor } from "@/app/newpost/__components/Editor";
import { v4 as uuidv4 } from "uuid";
import { addDoc, collection } from "@firebase/firestore";
import { useFormState, useFormStatus } from "react-dom";

function Page() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  const onChangeTitle: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.target.value);
  };

  const onChangeContent = (newContent: string) => {
    setContent(newContent);
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    let shouldRedirect = false;
    const key = `${user?.uid}/${uuidv4()}`;
    try {
      await addDoc(collection(db, "posts"), {
        title: title,
        content: content,
        createdAt: new Date()?.toLocaleDateString("ko", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        uid: user?.uid,
        email: user?.email,
        hashTags: tags,
      });
      setTitle("");
      setContent("");
      setCategory("");
      setTags([]);
      shouldRedirect = true;
      console.log("게시성공");
    } catch (e: any) {
      setTitle("");
      setContent("");
      setCategory("");
      setTags([]);
      console.log("게시실패", e);
      shouldRedirect = true;
    }
    if (shouldRedirect) router.replace("/");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        router.replace("/");
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  } else {
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
          <PopupEditor onChangeContent={onChangeContent} />
        </div>
        <button type="submit">작성하기</button>
      </form>
    );
  }
}

export default Page;
