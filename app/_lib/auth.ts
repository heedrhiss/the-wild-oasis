import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

const nextAuth = {
    providers: [
        Google({
            clientId: process.env.NEXT_GOOGLE_ID,
            clientSecret: process.env.NEXT_GOOGLE_SECRET
        })
        ],
    callbacks: {
        authorized({auth}:any) {
           if(auth?.user)  return true
        },
        async signIn({user}:any) {
        try {
            const existingGuest = await getGuest(user.email)
            if(!existingGuest) {
                await createGuest({fullName: user.name, email: user.email})
            }
            return true
        } catch{
            return false
        }
        },
        async session({session}:any) {
            const guest = await getGuest(session.user.email)
            session.user.guestId = guest.id
            return session
        }
    },
    pages: {
        signIn: '/login'
    }

}

export const {auth, signIn, signOut, handlers: {GET, POST}} = NextAuth(nextAuth)