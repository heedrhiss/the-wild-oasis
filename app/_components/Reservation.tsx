import { auth } from "../_lib/auth";
import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import { CabinsProp } from "../cabins/CabinsList";
import DateSelector from "./DateSelector";
import LoginMessage from "./LoginMessage";
import ReservationForm from "./ReservationForm";

type ReservationProps = {
    cabin: CabinsProp
  };

export default async function Reservation({cabin}:ReservationProps) {
  const session = await auth()
  const userData = session?.user
  const [settings, bookedDates] = await Promise.all([getSettings(), getBookedDatesByCabinId(cabin.id)])

  return (
    <div className="grid grid-cols-[auto_1fr] border border-primary-800 min-h-[400px] w-full">
      <DateSelector cabin={cabin} settings={settings} bookedDates= {bookedDates}/>
      {session?.user ? 
      <ReservationForm cabin={cabin} settings={settings} userData={userData} />
      : 
      <LoginMessage/>
      }
      </div>
  )
}
