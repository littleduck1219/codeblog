import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "@/firebase"; // 이전에 정의한 Firebase 인증 객체

export const {
  handlers: { GET, POST },
  signIn,
} = NextAuth({
  pages: { signIn: "/" },
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

});
