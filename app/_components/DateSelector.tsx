"use client"

import { isWithinInterval } from "date-fns";
import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useState } from "react";


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

const DateSelector: React.FC = () => {
  // State and constants with type annotations
  const [range, setRange] = useState<DateRange>({ from: undefined, to: undefined });

  const regularPrice = 23;
  const discount = 23;
  const numNights = 23;
  const cabinPrice = 23;

  // SETTINGS
  const minBookingLength = 1;
  const maxBookingLength = 23;

  // Handler for clearing the date range
  const resetRange = (): void => {
    setRange({ from: undefined, to: undefined });
  };

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="pt-10 place-self-center"
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
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
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
              </p>
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
