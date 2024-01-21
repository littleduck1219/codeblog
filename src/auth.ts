import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "@/firebase";

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
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      try {
        const googleCredential = GoogleAuthProvider.credential(
          account?.id_token,
        );
        const userCredential = await signInWithCredential(
          auth,
          googleCredential,
        ).catch((e) => {
          console.log(e);
          return false;
        });
        return !!userCredential;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
});
