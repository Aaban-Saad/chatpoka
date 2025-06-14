// DO NOT CALL SIGN_IN OR SIGN_OUT DIRECTLY
// USEE lib/auth.ts for signIn(login) and signOut(logout) functions
// lib/auth.ts and auth.ts are 2 different files




import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Facebook from "next-auth/providers/facebook"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import client from "@/lib/mongo_adapter"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(client),
  providers: [GitHub, Google, Facebook],
  pages: {
    signIn: "/signin", // Custom sign-in page
  },

  // database session
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id
      return session
    },
  }
})

