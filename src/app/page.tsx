"use client";

import "./page.scss";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUserStore } from "@/app/store/user";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    console.log("pageuser", user);
  }, [user]);

  return (
    <main className="home">
      <div className="home__leftSectionWrapper">
        <section className="home__leftSection">
          <div className="home__leftSectionFixed">
            <div className="home__postButton">
              {user?.email === "littleduck1219@gmail.com" ? (
                <div>글쓰기</div>
              ) : (
                <div>방명록</div>
              )}
            </div>
            <div>글쓰기</div>
            <div>글쓰기</div>
            <div>글쓰기</div>
            <div>글쓰기</div>
          </div>
        </section>
      </div>
      <div className="home__rightSectionWrapper">
        <Link href={`/post/1`}>post</Link>
        <div>post</div>
        <div>post</div>
        <div>post</div>
        <div>post</div>
        <div>post</div>
        <div>post</div>
      </div>
    </main>
  );
}
