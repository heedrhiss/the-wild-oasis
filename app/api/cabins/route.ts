import { getCabins } from "../../_lib/data-service"

export async function GET(){
    try{
        const cabins = await getCabins();
        return Response.json({cabins})
    }
    catch{
        return Response.json({message: "Error fetching cabins"}, {status: 500})
    }
}