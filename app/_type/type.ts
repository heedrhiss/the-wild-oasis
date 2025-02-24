import { User } from "next-auth";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface  bindDataType {
    startDate: Date | undefined;
    endDate: Date | undefined;
    numNights: number;
    totalPrice: number;
    cabinId: number;
    isPaid: boolean;
    extrasPrice: number;
    status: string;
    hasBreakfast: boolean;
}

export interface CustomUser extends User {
    guestId: number;
 }

export type ReservationFormProps = {
    cabin: CabinsProp
    userData: User | undefined
  };

export interface CabinsProp {
    id: number;
    name: string;
    maxCapacity: number;
    regPrice: number;
    discount?: number;
    image: string | StaticImport;
    description?: string;
  };

export type Props = {
    filter: string;
  };

export type date = Date | string;

export interface guestProps {
    id?: number;
    created_at?: string
    fullName: string;
    email: string;
    nationality?: string;
    countryFlag?: string;
    nationalID?: string;
  }
  
  
export type bookingProps = {
    id?: number;
    created_at: date;
    startDate: date;
    endDate: date;
    numNights: number;
    numGuests: number;
    cabinPrice?: number;
    extrasPrice?: number;
    totalPrice: number;
    status: string;
    hasBreakfast: boolean;
    isPaid: boolean;
    observations?: string;
    cabinId: number;
    guestId: number;
    guest: guestProps;
    cabins: {
      name: string;
      image: string;
    };
  }