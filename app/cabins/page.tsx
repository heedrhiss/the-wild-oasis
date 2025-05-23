import { Suspense } from "react";
import CabinsList from "./CabinsList";
import Filter from "../_components/Filter";
import Spinner from "@/app/_components/Spinner";
import ReservationReminder from "../_components/ReservationReminder";

export const revalidate = 3000;

type PageProps = {
  searchParams: Promise<{
    capacity: string;
  }>
};

export const metadata = {
  title: "Our Luxury Cabins",
  description: "Cozy yet luxurious cabins, located right in the heart of the Italian Dolomites. Imagine waking up to beautiful mountain views, spending your days exploring the dark forests around, or just relaxing in your private hot tub under the stars. Enjoy nature's beauty in your own little home away from home. The perfect spot for a peaceful, calm vacation. Welcome to paradise.",
};

export default async function Page({searchParams}:PageProps) {  
  const awaitedParams = await searchParams
  const filter = awaitedParams?.capacity ?? "all";

  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little home
        away from home. The perfect spot for a peaceful, calm vacation. Welcome
        to paradise.
      </p>
      <div className="flex justify-end mb-7 w-full">
        <Filter/>
      </div>
      <Suspense fallback={<Spinner/>} key={filter}>
      <CabinsList filter = {filter}/>
      <ReservationReminder/>
      </Suspense>
    </div>
  );
}
