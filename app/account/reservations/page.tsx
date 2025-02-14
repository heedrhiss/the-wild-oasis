import { auth } from "@/app/_lib/auth";
import Link from "next/link";
import { getBookings } from "@/app/_lib/data-service";
import ReservationCard from "./ReservationCard";

export const metadata = {
  title: "Reservations",
};

export interface UserProp {
  id?: string
  name?: string | null
  email?: string | null
  image?: string | null
  guestId?: number | null
}

  type Cabin = {
    name: string;
    image: string;
  };
  
  type Booking = {
    id: number;
    created_at: string;
    startDate: string;
    endDate: string;
    numNights: number;
    numGuests: number;
    totalPrice: number;
    guestId: number;
    cabinId: number;
    cabins: Cabin[];
  };
  type Bookings = Booking[];

export default async function Page() {
  
  const session = await auth()
  const user = session?.user as UserProp

  const bookings:Bookings = await getBookings(user!.guestId!)
  // const bookings: Booking[] = []
  // bookings.forEach((booking) => console.log(booking))
  console.log()

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your reservations
      </h2>

      {bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <Link className="underline text-accent-500" href="/cabins">
            luxury cabins &rarr;
          </Link>
        </p>
      ) : (
        <ul className="space-y-6">
         {bookings.map((booking) => (
         <ReservationCard booking={booking} key={booking.id} />
        ))}
        </ul>
      )}
    </div>
  );
}
