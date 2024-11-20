import { getCabin, getCabins } from "@/app/_lib/data-service";
import ReservationForm from "../../_components/ReservationForm";
import { CabinsProp } from "../CabinsList";
import CabinDetails from "./cabinDetails";
import DateSelector from "@/app/_components/DateSelector";


type PageProps = {
  params: {
    cabinId: number;
  };
};

export async function generateMetadata({params}:PageProps){
  const {name} = await getCabin(params.cabinId)
  return {
    title: `Cabin ${name}`
  }
}

export async function generateStaticParams(){
  const cabins:CabinsProp[] = await getCabins()
  const ids = cabins.map((cabin:CabinsProp) => ({
    cabinId: String(cabin.id)
  }))
  return ids
}

export default async function Page({params}:PageProps) {
  const cabin:CabinsProp = await getCabin(params.cabinId)
  

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <CabinDetails cabin={cabin} />

      <div>
        <h2 className="text-4xl font-semibold text-accent-400 text-center mb-8">
          Reserve Cabin-{cabin.name} today. Pay on arrival.
        </h2>
      </div>
      <div className="grid grid-cols-2 border border-primary-800 min-h-[400px] w-full">
      <DateSelector/>
      <ReservationForm/>
      </div>
    </div>
  );
}
