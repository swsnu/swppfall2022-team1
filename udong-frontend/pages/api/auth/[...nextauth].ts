import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.NEXTAUTH_GOOGLE_CLIENT_ID ?? '',
            clientSecret: process.env.NEXTAUTH_GOOGLE_CLIENT_SECRET ?? '',
            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code',
                },
            },
        }),
    ],
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 5 * 60 * 60, // 5 hours => seems like 6 hours alive time
    },
    callbacks: {
        async jwt({ token, user, account }) {
            if (user) {
                token.id = user.id
            }
            if (account) {
                token.accessToken = account.access_token ?? ''
            }
            return token
        },
        async session({ session, token }) {
            session.user.id = token.id
            session.accessToken = token.accessToken
            return session
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
})
