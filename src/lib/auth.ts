import { db as prisma } from '@/db'
import { compare } from 'bcrypt'
import { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
            name: 'Sign in',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email',
                    placeholder: 'ethan@panbo.com'
                },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {


                if (!credentials || !credentials?.email || !credentials.password) {
                    return null
                }

                const author = await prisma.author.findUnique({
                    where: {
                        email: credentials.email
                    }
                })

                if (!author) {
                    return null
                }
                const u = author as unknown as any
                const isPasswordValid = await compare(
                    credentials.password,
                    u.password
                )

                if (!isPasswordValid) {
                    return null
                }

                return {
                    id: author.id + '',
                    email: author.email,
                    name: author.name
                }

            }
        })
    ],
    callbacks: {
        session: ({ session, token }) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                }
            }
        },
        jwt: ({ token, user }) => {
            if (user) {
                const u = user as unknown as any
                return {
                    ...token,
                    id: u.id,
                }
            }
            return token
        }
    }
}