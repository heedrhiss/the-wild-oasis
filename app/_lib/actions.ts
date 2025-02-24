"use server";

import { auth, signIn, signOut } from "@/app/_lib/auth";
import { revalidatePath } from "next/cache";
import { supabase } from "./supabase";
import { redirect } from "next/navigation";
import { CustomUser, bindDataType } from "../_type/type";


export async function signInAction(){
   await signIn("google", { redirectTo: "/account" })
}

export async function signOutAction(){
   await signOut({ redirectTo: "/" })
}


export async function createBooking(bindData:bindDataType, formData:FormData){
   const session = await auth()
   if(!session?.user) throw new Error("Unauthorized, You have to be logged In")
   const user = session.user as CustomUser;
   const newBooking = {
   ...bindData,
   numGuests: +(formData.get("numGuests") as string),
   comment: formData.get("comment"),
   guestId: user.guestId
   }
   const { error } = await supabase
    .from('bookings')
    .insert([newBooking])
    
  if (error) {
    console.error(error);
    throw new Error('Booking could not be created');
  }
  revalidatePath(`/cabins/${bindData.cabinId}`)
  redirect('/cabins/thankyou')
}

export async function updateGuest(formData:FormData){

   const session = await auth()
   if(!session?.user) throw new Error("Unauthorized, You have to be logged In")
   const user = session.user as CustomUser;
   const nationalID = formData.get('nationalID') as string;
  const nationalityData = formData.get('nationality') as string;

  if (!nationalID || !nationalityData) {
    throw new Error('Missing required fields');
  }

  const [nationality, countryFlag] = nationalityData.split('%');
  const regex = /^[a-zA-Z0-9]{5,13}$/;
   
   if(regex.test(nationalID)){
      const updateData = {nationality, countryFlag, nationalID}
      const { error } = await supabase
      .from('guests')
      .update(updateData)
      .eq('id', user.guestId)
      revalidatePath("/account/profile")

   if (error) {
      throw new Error('Guest could not be updated');
   }

   }else{ 
      throw new Error("Enter a valid National ID") 
   }
}

export async function deleteBooking(bookingId:number){
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

export async function updateBooking(formData: FormData) {
   const session = await auth()
   if(!session?.user) throw new Error("Unauthorized, to update booking")
   const bookingId = Number(formData.get('bookingId'));
   const comment = String(formData.get('comment') || '').slice(0, 500);
   const numGuests = +(formData.get('numGuests') as string);
   const updateData = {
   comment,
   numGuests
}

   const { error } = await supabase
   .from('bookings')
   .update(updateData)
   .eq('id', bookingId)
   .select()
   .single();

 if (error) {
   console.error(error);
   throw new Error('Booking could not be updated');
 }

 revalidatePath('/account/reservations')
 revalidatePath(`/account/reservations/edit/${bookingId}`)
 redirect('/account/reservations')
}