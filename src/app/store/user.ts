import { create } from "zustand";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
import { useEffect } from "react";

type UserState = {
  user: User | null;
  setUser: (user: User | null) => void;
};

type User = {
  accessToken: string;
  auth: object;
  displayName: string;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  metadata: {
    createdAt: string;
    lastLoginAt: string;
    lastSignInTime: string;
    creationTime: string;
  };
  phoneNumber: string | null;
  photoURL: string;
  providerId: string;
  uid: string;
  refreshToken: string;
};

// 사용자 상태를 저장하는 스토어 생성
export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user: User | null) => set({ user }),
}));
