import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service"

interface Proptype {
    params: {
        cabinId: number
    }
}
export async function GET(request:Request, {params}:Proptype){
    console.log(request)
    const cabinId = params.cabinId;
    try{
        const [cabin, bookedDates] = await Promise.all([getCabin(cabinId), getBookedDatesByCabinId(cabinId)])
        return Response.json({cabin, bookedDates})
    }
    catch(err){
        console.log(err)
        return Response.json({message: "Error fetching cabin"}, {status: 500})
    }
}