import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from "./prisma";
import { compare } from "bcrypt"

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/log-in',
        // signOut:'/log-in'
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",

            credentials: {
                email: { label: "Email", type: "email", placeholder: "example@gmail.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {


                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Invalid email or password')
                }

                const existingUser = await prisma.user.findUnique({
                    where: {
                        email: credentials?.email
                    }
                })
                if (!existingUser) {
                    throw new Error('Invalid email ')
                }
                if (!existingUser.password) {
                    return null
                }
                const passwordValid = await compare(credentials.password, existingUser.password)
                if (!passwordValid) {
                    throw new Error('Invalid  password')
                }
                return {
                    id: `${existingUser.id}`,
                    username: existingUser.username,
                    email: existingUser.email
                }
            }
        })
    ],
    debug: process.env.NODE_ENV === 'development'
}