import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req){
    const token = await getToken({req, secret: process.env.JWT_SECRET})
    // console.log('token',token)
    // return NextResponse.next()
    // console.log('pathname',req.nextUrl)
    // return NextResponse.next()

    const {pathname} = req.nextUrl

    console.log('pathname',req.nextUrl)
    if(pathname.includes('/api/auth') || token){
        console.log('next')
        return NextResponse.next()
    }

    if(!token && pathname !== '/login') {
        console.log('redirige a login')
        return NextResponse.redirect(new URL('/login', req.url))
    }

}

export const config = {
    matcher: [
      /*
       * Match all request paths except for the ones starting with:
       * - api (API routes)
       * - _next/static (static files)
       * - favicon.ico (favicon file)
       */
      '/((?!api|_next/static|favicon.ico).*)',
    ],
  }