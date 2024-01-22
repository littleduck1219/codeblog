"use client";

import "./page.scss";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const router = useRouter();

  return (
    <main className="home">
      <div className="home__leftSectionWrapper">
        <section className="home__leftSection">
          <div className="home__leftSectionFixed">
            <div>
              <div>방명록</div>
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
