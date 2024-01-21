"use client";

import "./page.scss";

export default function Home() {
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
        <div>post</div>
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
