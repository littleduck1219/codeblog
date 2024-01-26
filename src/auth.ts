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
  // callbacks: {
  //   async signIn({ user, account, profile, email, credentials }) {
  //     if (account?.id_token) {
  //       try {
  //         const googleCredential = GoogleAuthProvider.credential(
  //           account.id_token,
  //         );
  //         await signInWithCredential(auth, googleCredential);
  //         return true; // 인증 성공
  //       } catch (e) {
  //         console.error("Firebase authentication error:", e);
  //         return false; // 인증 실패
  //       }
  //     }
  //     return false; // ID 토큰이 없음
  //   },
  // },
});
