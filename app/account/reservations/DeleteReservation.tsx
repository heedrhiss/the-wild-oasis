"use client"

import SpinnerMini from '@/app/_components/SpinnerMini';
import { deleteBooking } from '@/app/_lib/actions';
import { TrashIcon } from '@heroicons/react/24/solid';
import { useTransition } from 'react';

type DeleteReservationProps = {
  bookingId: number;
};

function DeleteReservation({ bookingId }:DeleteReservationProps) {
  const [isPending, setTransistion] = useTransition();
  
  const handleDelete = ()=> {
    setTransistion(()=>deleteBooking(bookingId))
  }

  return (
    <button className='group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-red-600 transition-colors' onClick={handleDelete}>
      { !isPending ?
      <>
      <TrashIcon className='h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors' />
      <span className='mt-1'>Delete</span>
      </> : <span className='mx-auto'> <SpinnerMini/></span>
      }
    </button>
  );
}

export default DeleteReservation;
