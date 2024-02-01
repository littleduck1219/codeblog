"use client";

import React, { useEffect, useRef, useState } from "react";
import "./header.scss";
import Image from "next/image";
import { toast } from "react-toastify";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
  signOut,
} from "@firebase/auth";
import Link from "next/link";
import { auth } from "@/firebase";
import { useUserStore } from "@/store/user";
import { SlPencil } from "react-icons/sl";
import { useRouter } from "next/navigation";
import { UserState } from "@/model";

export default function Header() {
  const [profileModal, setProfileModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const [profileImageUrl, setProfileImageUrl] = useState(
    "/img/profile_default.jpg",
  );
  const profileOnClick = () => {
    setProfileModal(!profileModal);
  };

  const onClickLogin = async () => {
    setProfileModal(false);
    await signInWithRedirect(auth, new GoogleAuthProvider())
      .then((result) => {
        console.log(result);
        toast.success("로그인 되었습니다.");
      })
      .catch((error) => {
        console.log(error);
        if (error.code === "auth/account-exists-with-different-credential") {
          toast.error("이미 가입된 계정입니다.");
        } else {
          toast.error("로그인에 실패했습니다.");
        }
      });
  };

  const onClickLogout = async () => {
    setProfileModal(false);
    await signOut(auth);
    router.push("/");
  };

  useEffect(() => {
    if (user?.photoURL) {
      setProfileImageUrl(user.photoURL);
    } else {
      setProfileImageUrl("/img/profile_default.jpg");
    }
  }, [user]);

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

  return (
    <div className="Header">
      <Link href={`/`} className="Header__title">
        <img src="/img/littleduck-name-hight.png" alt="title" />
      </Link>
      <div className="Header__loginMenu">
        {user?.email === "littleduck1219@gmail.com" && (
          <Link href={user ? "/newpost" : "/"}>
            <SlPencil />
          </Link>
        )}
        <div className="Header__loginButton" onClick={profileOnClick}>
          <img src={profileImageUrl} alt="기본 프로필" />
        </div>
      </div>

      {profileModal && (
        <div ref={modalRef} className="Header__profile">
          <div className="Header__userId">{user?.email}</div>
          {user ? (
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
