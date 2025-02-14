import { ActionButton } from "@/app/_components/ActionButton";
import { updateBooking } from "@/app/_lib/actions";
import { getBooking, getCabin } from "@/app/_lib/data-service";

type PageProps = {
  params: Promise<{ bookingId: number }>;
};

export default async function Page({ params }:PageProps) {
  const { bookingId } = await params;
  const { numGuests, comment, cabinId } = await getBooking(bookingId);
  const { maxCapacity } = await getCabin(cabinId);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{bookingId}
      </h2>

      <form action={updateBooking} className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col">
        <input type="hidden" value={bookingId} name="bookingId"/>
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            defaultValue={numGuests}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="comment">
            Anything we should know about your stay?
          </label>
          <textarea
            name="comment"
            defaultValue={comment}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
        <ActionButton pendingLabel='Updating'>Update Reservation</ActionButton>
        </div>
      </form>
    </div>
  );
}
