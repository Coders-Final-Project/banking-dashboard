import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === "/signin" || path === "/signup";

  const token = request.cookies.get("token")?.value || "";

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  // if (!isPublicPath && !token) {
  //   return NextResponse.redirect(new URL("/signin", request.nextUrl));
  // }
}

export const config = {
  matcher: [
    "/",
    "/invoices",
    "/cards",
    "/contracts",
    "/documents",
    "/insurance",
    "/invoices",
    "/settings",
    "/transactions",
    "/signin",
    "/signup",
  ],
};
