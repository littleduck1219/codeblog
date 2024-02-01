"use client";

import { UserState } from "@/model";
import "./post.scss";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useUserStore } from "@/store/user";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";
import { Post } from "@/model";

export default function Post() {
  const [posts, setPosts] = useState<Post[]>([]);
  const selectUser = (state: UserState) => state.user;
  const user = useUserStore(selectUser);

  function extractTextFromHTML(htmlString: string) {
    const doc = new DOMParser().parseFromString(htmlString, "text/html");
    return doc.body.textContent ? doc.body.textContent.trim() : "";
  }

  useEffect(() => {
    let postsRef = collection(db, "posts");
    let postsQuery = query(postsRef, orderBy("createdAt", "desc"));

    onSnapshot(postsQuery, (snapShot) => {
      let dataObj = snapShot.docs.map((doc) => ({
        ...doc.data(),
        id: doc?.id,
      }));
      setPosts(dataObj as Post[]);
    });
  }, []);

  useEffect(() => {
    console.log(posts);
  }, [posts]);

  return (
    <>
      {posts?.map((post) => (
        <Link href={`/post/${post?.id}`} key={post.id}>
          <div className="post">
            <div className="post__image">
              <img
                src={`https://marketplace.canva.com/EAD2xI0GoM0/1/0/1600w/canva-%ED%95%98%EB%8A%98-%EC%95%BC%EC%99%B8-%EC%9E%90%EC%97%B0-%EC%98%81%EA%B0%90-%EC%9D%B8%EC%9A%A9%EB%AC%B8-%EB%8D%B0%EC%8A%A4%ED%81%AC%ED%86%B1-%EB%B0%B0%EA%B2%BD%ED%99%94%EB%A9%B4-rssvAb9JL4I.jpg`}
              />
            </div>
            <div className="post__article">
              <h2 className="post__title">{post.title}</h2>
              <div className="post__text">
                {post.content ? extractTextFromHTML(post.content) : ""}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}
