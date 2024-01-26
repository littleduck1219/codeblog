import React, { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
import { useUserStore } from "@/app/store/user";
import { toast } from "react-toastify";

export function useUser() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state: any) => state.setUser);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => setUser(user));
  }, []);

  return user;
}
