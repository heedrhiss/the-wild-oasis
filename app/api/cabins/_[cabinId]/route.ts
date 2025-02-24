// import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(
//   request: NextRequest,
//   { params }: { params: { cabinId: string } }
// ) {
//   console.log(request); 

//   const cabinId = parseInt(params.cabinId);

//   if (isNaN(cabinId)) {
//     return NextResponse.json(
//       { message: "Invalid cabin ID" },
//       { status: 400 }
//     );
//   }

//   try {
//     const [cabin, bookedDates] = await Promise.all([
//       getCabin(cabinId),
//       getBookedDatesByCabinId(cabinId),
//     ]);

//     return NextResponse.json({ cabin, bookedDates });
//   } catch {
//     return NextResponse.json(
//       { message: "Error fetching cabin" },
//       { status: 500 }
//     );
//   }
// }