import { Suspense } from "react";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { CabinsProp } from "../CabinsList";
import Spinner from "@/app/_components/Spinner";
import Reservation from "@/app/_components/Reservation";
import CabinDetails from "./cabinDetails";


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
  return cabins.map((cabin:CabinsProp) => ({
    cabinId: String(cabin.id)
  }))
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
      <Suspense fallback={<Spinner/>}>
      <Reservation cabin={cabin}/>
      </Suspense>
    </div>
  );
}
