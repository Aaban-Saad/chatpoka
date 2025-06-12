// DO NOT CALL SIGN_IN OR SIGN_OUT DIRECTLY
// USEE lib/auth.ts for signIn(login) and signOut(logout) functions
// lib/auth.ts and auth.ts are 2 different files




import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Facebook from "next-auth/providers/facebook"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub, Google, Facebook],
  callbacks: {
    // This callback is fired when a JWT is created or updated
    async jwt({ token, user, account, profile }) {
      // 'user' is only available the first time this callback is called on a new session (after sign-in)

      if (user) {
        token.id = account?.providerAccountId || user.id // Assign the user's ID to the token;
        token.provider = account?.provider // Assign the user's ID to the token
        console.log("\n\n\n   account", account);
        console.log("\n\n\n   profile", profile);
      }
      return token;
    },
    // This callback is fired whenever a session is checked
    async session({ session, token }) {
      // The 'token' here is the one returned from the 'jwt' callback
      // We assign the ID from the token to the session user object
      if (session.user) {
        session.user.id = token.id as string;
        session.user.provider = token.provider; // Add provider to session user
      }
      return session;
    },
  },
})

