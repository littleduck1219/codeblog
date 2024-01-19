"use client";

import React, { useEffect, useRef, useState } from "react";
import "./header.scss";
import Image from "next/image";

export default function Header() {
  const [profileModal, setProfileModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const profileOnClick = () => {
    setProfileModal(!profileModal);
    console.log(profileModal);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setProfileModal(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [modalRef]);

  return (
    <div className="Header">
      <div className="Header__title">
        <img src="/img/littleduck-name-hight.png" alt="title" />
      </div>
      <div onClick={profileOnClick}>
        <Image
          width={80}
          height={80}
          src="/img/littleduck-img-icon.png"
          alt="profile-icon"
        />
      </div>
      {profileModal && (
        <div ref={modalRef} className="Header__profile">
          <div className="Header__profile--item">내 정보</div>
          <div className="Header__profile--item">로그아웃</div>
        </div>
      )}
    </div>
  );
}
