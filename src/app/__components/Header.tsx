"use client";

import React, { useEffect, useRef, useState } from "react";
import "./header.scss";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";

export default function Header() {
  const [profileModal, setProfileModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const { data: userInfo } = useSession();

  const profileOnClick = () => {
    setProfileModal(!profileModal);
  };

  const onClickLogin = async () => {
    setProfileModal(false);
    // const provider = new GoogleAuthProvider();
    await signIn("google", { callbackUrl: "/" });
    // await signInWithPopup(auth, new GoogleAuthProvider())
    //   .then((result) => {
    //     console.log(result);
    //     toast.success("로그인 되었습니다.");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     if (error.code === "auth/account-exists-with-different-credential") {
    //       toast.error("이미 가입된 계정입니다.");
    //     } else {
    //       toast.error("로그인에 실패했습니다.");
    //     }
    //   });
  };

  const onClickLogout = async () => {
    setProfileModal(false);
    await signOut({ callbackUrl: "/" });
    toast.success("로그아웃 되었습니다.");
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
  }, [modalRef, profileModal]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // 사용자가 로그인했습니다.
        console.log("Logged in user:", user);
      } else {
        // 사용자가 로그아웃했습니다.
        console.log("No user is logged in.");
      }
    });

    return () => unsubscribe();
  }, []);
  console.log(auth);

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
          {userInfo ? (
            <div className="Header__profile--item" onClick={onClickLogout}>
              로그아웃
            </div>
          ) : (
            <div className="Header__profile--item" onClick={onClickLogin}>
              로그인
            </div>
          )}
        </div>
      )}
    </div>
  );
}
