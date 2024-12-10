"use client"

import { isWithinInterval } from "date-fns";
import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { CabinsProp } from "../cabins/CabinsList";
import { useReservationContext } from "../context/ReservationContext";

interface DateSelectorProps {
  cabin: CabinsProp;
  settings: {
    breakfastPrice: number;
    created_at: string;
    id: number;
    maxBookingLength: number;
    maxGuestPerBooking: number;
    minBookingLength: number
  };
  bookedDates: Date[];
  
}

// Utility function with type annotations
function isAlreadyBooked(range: DateRange, datesArr: Date[]): boolean {
  return (
    range.from !== undefined &&
    range.to !== undefined &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from!, end: range.to! })
    )
  );
}

const DateSelector = ({cabin, settings, bookedDates}:DateSelectorProps) => {

  const {range, setRange, resetRange} = useReservationContext()
  
  const {regPrice, discount} = cabin;
  const numNights = 23;
  const cabinPrice = discount ? numNights * (regPrice - discount) : numNights * regPrice;

  // SETTINGS
  const {minBookingLength, maxBookingLength} = settings;


  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="pt-10 place-self-center px-3"
        mode="range"
        min={minBookingLength + 1}
        max={maxBookingLength}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={2}
        selected={range}
        onSelect={setRange}
      />

      <div className="flex items-center justify-between px-3 bg-accent-500 text-primary-800 h-[70px]">
        <div className="flex items-baseline gap-4">
          <p className="flex gap-2 items-baseline">
            {discount! > 0 ? (
              <>
                <span className="text-2xl">${regPrice - discount!}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>x
            </>
          ) : undefined}
        </div>

        {range.from || range.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : undefined}
      </div>
    </div>
  );
};

export default DateSelector;
