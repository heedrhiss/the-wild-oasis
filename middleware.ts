import {auth} from "@/app/_lib/auth"
// import { NextResponse } from "next/server"

// export const middleware = (request:any)=> {
// console.log(request)
// return NextResponse.redirect(new URL("/about",  request.url))
// }

export const middleware = auth;

export const config = {
    matcher: ['/account']
}