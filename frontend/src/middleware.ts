import { NextResponse } from "next/server";
import { parse } from 'cookie';

export default async function middleware(req: any) {
  const { pathname } = req.nextUrl;

  return NextResponse.next();
}
export const config = {
  matcher: ["/", "/dashboard/:path*"],
};

//return NextResponse.redirect(new URL('/login', req.url));
// GET /_next/data/build-id/hello.json

// with the flag this now /_next/data/build-id/hello.json
// without the flag this would be normalized to /hello
