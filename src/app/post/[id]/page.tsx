"use client";

import React, { useCallback, useEffect, useState } from "react";
import "./page.scss";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Post } from "@/model";

export default function Page({
  params,
}: {
  params: { slug: string; id: string };
}) {
  const [post, setPost] = useState<Post | null>(null);

  const getPost = useCallback(async () => {
    if (params.id) {
      const docRef = doc(db, "posts", params.id);
      const docSnap = await getDoc(docRef);

      setPost({ ...(docSnap.data() as Post), id: docSnap.id });
    }
  }, [params.id]);

  useEffect(() => {
    const fetchPost = async () => {
      await getPost();
    };

    if (params.id) {
      fetchPost();
    }
    console.log("getPost", post);
  }, [getPost, params.id]);

  return (
    <div className="postDetail">
      <div className="postDetail__banner">
        <div className="postDetail__banner__titleWrapper">
          <h1 className="postDetail__banner__titleWrapper__title">
            {post?.title}
          </h1>
          <div className="postDetail__banner__titleWrapper__createAt">
            {post?.createdAt}
          </div>
        </div>
        <div className="postDetail__banner__image">
          <img
            src={`https://store.nintendo.co.kr/media/catalog/product/cache/8e3c84988db1fdb90470f4d01453d879/b/2/b2cd7a4ff6ae5a520b408a003056ca3ea482706e756943c6289cf48f9516d373_1694549062.jpg`}
            alt="mainImage"
          />
        </div>
      </div>
      <div className="postDetail__postbody">
        <div dangerouslySetInnerHTML={{ __html: post?.content || "" }} />
      </div>
    </div>
  );
}
