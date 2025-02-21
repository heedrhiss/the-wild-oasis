"use server";

import { auth, signIn, signOut } from "@/app/_lib/auth";
import { revalidatePath } from "next/cache";
import { supabase } from "./supabase";
import { redirect } from "next/navigation";

export async function signInAction(){
   await signIn("google", { redirectTo: "/account" })
}

export async function signOutAction(){
   await signOut({ redirectTo: "/" })
}


export async function createBooking(bindData, formData){
   const session = await auth()
   if(!session?.user) throw new Error("Unauthorized, You have to be logged In")
   const newBooking = {
   ...bindData,
   numGuests: +(formData.get("numGuests")),
   comment: formData.get("comment"),
   guestId: session.user.guestId
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
// export async function updateGuest(formData: FormData): Promise<void> {
//    const session = await auth();
//    if (!session?.user) throw new Error("Unauthorized, You have to be logged In");
//    if (!session.user.id) throw new Error("Unauthorized, You have to be logged In");
 
//    const nationalID = formData.get("nationalID") as string | null;
//    const nationalityRaw = formData.get("nationality") as string | null;
 
//    if (!nationalID || !nationalityRaw) {
//      throw new Error("Missing required form data");
//    }
 
//    const [nationality, countryFlag] = nationalityRaw.split("%");
 
//    const regex = /^[a-zA-Z0-9]{5,13}$/;
//    if (!regex.test(nationalID)) {
//      throw new Error("Enter a valid National ID");
//    }
 
//    const updateData = { nationality, countryFlag, nationalID };
 
//    const { error } = await supabase
//      .from("guests")
//      .update(updateData)
//      .eq("id", session.user.guestId);
 
//    if (error) {
//      throw new Error("Guest could not be updated");
//    }
 
//    revalidatePath("/account/profile");
//  }
 

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

export async function updateBooking(formData){
   const session = await auth()
   if(!session?.user) throw new Error("Unauthorized, to update booking")
   const bookingId = Number(formData.get('bookingId'));
   const updateData = {
   comment: formData.get('comment').slice(0,500),
   numGuests: +(formData.get('numGuests'))
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