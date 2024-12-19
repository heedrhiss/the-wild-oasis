"use server"
import { auth, signIn, signOut } from "@/app/_lib/auth";
import { revalidatePath } from "next/cache";
import { supabase } from "./supabase";

export async function signInAction(){
   await signIn("google", { redirectTo: "/account" })
}

export async function signOutAction(){
   await signOut({ redirectTo: "/" })
}

export async function updateGuest(formData){

   const session = await auth()
   if(!session?.user) throw new Error("Unauthorized, You have to be logged In")
   const nationalID = formData.get("nationalID")
   const [nationality, countryFlag] = formData.get("nationality").split("%")
   const regex = /^[a-zA-Z0-9]{5,13}$/;
   if(regex.test(nationalID)){
      const updateData = {nationality, countryFlag, nationalID}
      const { error } = await supabase
      .from('guests')
      .update(updateData)
      .eq('id', session.user.guestId)
      revalidatePath("/account/profile")

   if (error) {
      throw new Error('Guest could not be updated');
   }

   }else{ 
      throw new Error("Enter a valid National ID") 
   }
}

export async function deleteBooking(bookingId){
   const session = await auth()
   if(!session?.user) throw new Error("Unauthorized, to delete booking")
   const { error } = await supabase
   .from('bookings')
   .delete()
   .eq('id', bookingId)
   revalidatePath("/account/reservations")
   if (error) {
      throw new Error('Booking could not be deleted');
   }
}