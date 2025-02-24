import NextAuth, {NextAuthConfig, Session, User } from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

const nextAuth:NextAuthConfig = {
    providers: [
        Google({
            clientId: process.env.NEXT_GOOGLE_ID,
            clientSecret: process.env.NEXT_GOOGLE_SECRET
        })
        ],
    callbacks: {
        authorized({auth}: { auth: Session | null }) {
           if(auth?.user)  return true
        },
        async signIn({user}: { user: User }) {
        try {
            const existingGuest = await getGuest(user.email!)
            if(!existingGuest) {
                await createGuest({fullName: user.name!, email: user.email!})
            }
            return true
        } catch{
            return false
        }
        },
        async session({ session }: any): Promise<Session> {
            try {
                const guest = await getGuest(session!.user!.email!);
                if (guest) {
                  session!.user!.guestId = guest.id;
                }
              } catch (error) {
                console.error("Session retrieval error:", error);
              }
            return session
        }
    },
    pages: {
        signIn: '/login'
    }

}

export const {auth, signIn, signOut, handlers: {GET, POST}} = NextAuth(nextAuth)