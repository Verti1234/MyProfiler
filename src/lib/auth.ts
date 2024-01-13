import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";
import { compare } from "bcrypt";
import { PrismaAdapter } from "@next-auth/prisma-adapter"



export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db),
  pages: {
    signIn:"/"
  },
  session: {
    strategy: "jwt",
  },
  
providers: [
  CredentialsProvider({
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "email", placeholder: "hello@example.com" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials, req) {

      if (!credentials?.email || !credentials?.password) {
        return null
      } 
      const user = await db.user.findUnique({
        where: {
          email: credentials.email
        }
      })
      if(!user) return null

      const isPasswordValid = user.password ? await compare(credentials.password, user.password) : false;
      if (!isPasswordValid) return null

      return {
        id: user.id,
        firstName: user.firstName,
        SurName: user.SurName,
        email: user.email,
        image: user.image,
      }
    }
  })
],
callbacks: {
  session: ({session,token}) => {
    // console.log("Session gejuvhu", session);
    return {
      ...session,
      user:{
        ...session.user,
        id: token.id,
      }
    }
  },
  jwt: ({token, user}) => {
    // console.log("JWT gejuchu",{token, user});
    if(user) {
      const u = user as unknown as any
      return {
      ...token,
      id: u.id,
      user: {
        ...token,
        id: u.id,
      }
      }
    }
    return token
  }
}
}