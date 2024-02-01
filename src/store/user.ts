import { create } from "zustand";
import { auth } from "@/firebase";
import { User, UserState } from "@/model";
import { User as FirebaseUser, onAuthStateChanged } from "firebase/auth";

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user: User | null) => set({ user }),
  initializeAuthListener: () => {
    onAuthStateChanged(auth, (firebaseUser) => {
      const user: User | null = transformFirebaseUserToUser(firebaseUser);
      set({ user });
    });
  },
}));

useUserStore.getState().initializeAuthListener();

function transformFirebaseUserToUser(
  firebaseUser: FirebaseUser | null,
): User | null {
  if (!firebaseUser) return null;

  return {
    displayName: firebaseUser.displayName,
    email: firebaseUser.email,
    emailVerified: firebaseUser.emailVerified,
    isAnonymous: firebaseUser.isAnonymous,
    metadata: {
      createdAt: firebaseUser.metadata.creationTime,
      lastSignInTime: firebaseUser.metadata.lastSignInTime,
    },
    phoneNumber: firebaseUser.phoneNumber,
    photoURL: firebaseUser.photoURL,
    providerId: firebaseUser.providerId,
    uid: firebaseUser.uid,
    refreshToken: firebaseUser.refreshToken,
  };
}
