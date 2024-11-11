import CabinCard from "@/app/cabins/CabinCard";
import { getCabins } from "../_lib/data-service";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export type CabinsProp = {
  id: number;
  name: string;
  maxCapacity: number;
  regPrice: number;
  discount?: number;
  image: string | StaticImport;
  description?: string;
};

export default async function CabinsList() {
    const cabins: CabinsProp[] = await getCabins()
  return (
    <>
    {cabins.length > 0 && (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
          {cabins.map((cabin) => (
            <CabinCard cabin={cabin} key={cabin.id} />
          ))}
        </div>
      )}
    </>
  )
}
