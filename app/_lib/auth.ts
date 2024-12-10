import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const nextAuth = {
    providers: [
        Google({
            clientId: process.env.NEXT_GOOGLE_ID,
            clientSecret: process.env.NEXT_GOOGLE_SECRET
        })
]
}

export const {auth, handlers: {GET, POST}} = NextAuth(nextAuth)