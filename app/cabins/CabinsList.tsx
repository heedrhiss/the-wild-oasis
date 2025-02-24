import CabinCard from "@/app/cabins/CabinCard";
import { getCabins } from "../_lib/data-service";
import { CabinsProp, Props } from "../_type/type";

export default async function CabinsList({filter}:Props) {
    const cabins: CabinsProp[] = await getCabins()
    
    let displayedCabins = cabins;
    if (filter === 'all')  displayedCabins = cabins;
    if (filter === 'small') displayedCabins = cabins.filter((cabin: CabinsProp) => cabin.maxCapacity < 4);
    if (filter === 'medium') displayedCabins = cabins.filter((cabin: CabinsProp) => cabin.maxCapacity > 3 && cabin.maxCapacity < 8);
    if (filter === 'large') displayedCabins = cabins.filter((cabin: CabinsProp) => cabin.maxCapacity > 7);
  return (
    <>
    {cabins.length > 0 && (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
          {displayedCabins.map((cabin) => (
            <CabinCard cabin={cabin} key={cabin.id} />
          ))}
        </div>
      )}
    </>
  )
}
