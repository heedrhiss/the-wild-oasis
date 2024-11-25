"use client"

import { createContext, useContext, useState } from "react"
import { DateRange } from "react-day-picker";

type ProviderProps = {
    children: React.ReactNode
}
type ReservationContextProp = {
    range: DateRange,
    setRange: React.Dispatch<React.SetStateAction<DateRange>>,
    resetRange: () => void
}

const ReservationContext = createContext({}as ReservationContextProp);

function ReservationProvider({children}:ProviderProps){
    const [range, setRange] = useState<DateRange>({ from: undefined, to: undefined });
    const resetRange = (): void => {
        setRange({ from: undefined, to: undefined });
      };
    return <ReservationContext.Provider value={{range, setRange, resetRange}}>
        {children}
    </ReservationContext.Provider>
}
function useReservationContext(){
    const context = useContext(ReservationContext);
    if(context === undefined){
        throw new Error("useReservationContext must be used within a ReservationProvider");
    }
    return context;
}

export {ReservationProvider, useReservationContext}