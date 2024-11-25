import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import { CabinsProp } from "../cabins/CabinsList";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";

type ReservationProps = {
    cabin: CabinsProp
  };
export default async function Reservation({cabin}:ReservationProps) {
    const [settings, bookedDates] = await Promise.all([getSettings(), getBookedDatesByCabinId(cabin.id)])

  return (
    <div className="grid grid-cols-2 border border-primary-800 min-h-[400px] w-full">
      <DateSelector cabin={cabin} settings={settings} bookedDates= {bookedDates}/>
      <ReservationForm cabin={cabin} settings={settings} />
      </div>
  )
}
