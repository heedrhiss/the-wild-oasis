"use client";

import Image from "next/image";

import { useReservationContext } from "../context/ReservationContext";
import { differenceInDays } from "date-fns";
import { createBooking } from "../_lib/actions";
import { ActionButton } from "./ActionButton";
import { ReservationFormProps } from "../_type/type";


function ReservationForm({cabin, userData}:ReservationFormProps) {
  const {range, resetRange} = useReservationContext()
  const image = userData?.image
  const {maxCapacity, regPrice, id, discount} = cabin;
  const numNights = differenceInDays(range.to!, range.from!) ?? 0;
  const totalPrice = !discount ? numNights * regPrice : numNights * (regPrice - discount)
  const bindData = {
    startDate: range.from,
    endDate: range.to,
    numNights,
    totalPrice,
    cabinId: id,
    isPaid: false,
    extrasPrice: 0,
    status: "unconfirmed",
    hasBreakfast: false
  }
  
  const createBookingBinded = createBooking.bind(null, bindData)

  return (
    
    <div className='scale-[1.01]'>
      <div className='bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center'>
        <p>Logged in as</p>

        <div className='flex gap-4 items-center'>
        {image && (
              <Image 
                src={image} 
                alt={userData.name || "UserData avatar"}
                width={30}
                height={30}
                className="rounded-full"
              />
            )}
          <p>{userData?.name}</p>
        </div>
  
      </div>

      <form action={(formData)=> {
        createBookingBinded(formData)
        resetRange()
      }} className='bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col'>
        <div className='space-y-2'>
          <label htmlFor='numGuests'>How many guests?</label>
          <select
            name='numGuests'
            id='numGuests'
            className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm'
            required
          >
            <option value='' key=''>
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? 'guest' : 'guests'}
              </option>
            ))}
          </select>
        </div>

        <div className='space-y-2'>
          <label htmlFor='comment'>
            Anything we should know about your stay?
          </label>
          <textarea
            name='comment'
            id='comment'
            className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm'
            placeholder='Any pets, allergies, special requirements, etc.?'
          />
        </div>

        <div className='flex justify-end items-center gap-6'>
          {(range.from && range.to) ?
          <ActionButton pendingLabel="Reserving...">Reserve now</ActionButton>
          :
          <p className='text-primary-300 text-base'>Start by selecting dates</p>
}
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
