import React from "react";
import "./header.scss";
import Image from "next/image";

const Header = () => {
  return (
    <div className="Header">
      <div>
        <Image
          width={300}
          height={80}
          src="/img/littleduck-name-hight.png"
          alt="title"
        />
      </div>
      <div>
        <Image
          width={80}
          height={80}
          src="/img/littleduck-img-icon.png"
          alt="profile-icon"
        />
      </div>
    </div>
  );
};

export default Header;
