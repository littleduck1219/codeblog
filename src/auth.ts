import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "@/firebase";

export const {
  handlers: { GET, POST },
  signIn,
} = NextAuth({
  pages: {
    // signIn: '/i/flow/login',
    // newUser: '/i/flow/signup',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "select_account",
          loginHint: "${HINT}",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (
        account?.provider === "google" &&
        typeof account.idToken === "string"
      ) {
        const credential = GoogleAuthProvider.credential(account.idToken);
        try {
          // Firebase 인증
          await signInWithCredential(auth, credential);
          return true;
        } catch (error) {
          console.error("Firebase authentication error:", error);
          return false;
        }
      }
      return true;
    },
    // ... 다른 콜백들
  },
});
