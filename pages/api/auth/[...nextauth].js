import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import prismadb from "@/lib/prismadb"
import { compare } from "bcrypt";

import GithubProvider from 'next-auth/providers/github';
import GooogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter'



export default NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID || '',
            clientSecret: process.env.GITHUB_SECRET || ''
        }),
        GooogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
        }),
        Credentials({
            id: 'credentials',
            name: 'credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'text'
                },
                password: {
                    label: 'Password',
                    type: 'password'
                }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Email or password required');
                }

                const user = await prismadb.user.findUnique({
                    where: {
                        email: credentials?.email
                    }
                });

                if (!user || !user.hashedPassword) {
                    throw new Error('Email Does Not Exist');
                }

                const isCorrentPassword = await compare(credentials.password, user.hashedPassword);

                if (!isCorrentPassword) {
                    throw new Error('InCorrent Password')
                }

                return user;

            }
        })
    ],

    pages: {
        signIn: '/auth',
    },
    debug: process.env.NODE_ENV === 'development',
    adapter: PrismaAdapter(prismadb),
    session: {
        strategy: 'jwt'
    },
    jwt: {
        secret: process.env.NEXTAUTH_JWT_SECRET,
    },
    secret: process.env.NEXTAUTH_SECRET

})