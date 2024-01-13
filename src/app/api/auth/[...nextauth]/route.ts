import connectMongoDB from "@/lib/mongodb";
import User from "@/modals/user";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { email, password }: any = credentials;

        try {
          await connectMongoDB();
          const user = await User.findOne({ email });

          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            return null;
          }

          return user;
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }:any) => {
      // If user object is available, it means this is the user logging in - so populate the JWT with the user's role
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    session: async ({ session, token }:any) => {
      // Include the role from the JWT token into the session object
      session.user.role = token.role;
      return session;
    },
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };