import React from "react";
import "./page.scss";

function Page() {
  return (
    <div className="post">
      <div className="post__mainImage-Wrapper">
        <img
          className="post__mainImage"
          src={`https://store.nintendo.co.kr/media/catalog/product/cache/8e3c84988db1fdb90470f4d01453d879/b/2/b2cd7a4ff6ae5a520b408a003056ca3ea482706e756943c6289cf48f9516d373_1694549062.jpg`}
          alt="mainImage"
        />
      </div>
    </div>
  );
}

export default Page;
