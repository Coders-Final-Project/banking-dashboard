import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

import acceptLanguage from "accept-language";

import { fallbackLng, languages, cookieName } from "./i18n/settings";

acceptLanguage.languages(languages);

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const publicPaths = [
    "/signin",
    "/signup",
    "/az/signin",
    "/en/signup",
    "/az/signup",
    "/en/signin",
  ];

  const token = request.cookies.get("token")?.value || "";

  if (publicPaths.includes(path) && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  const restrictedPaths = [
    "/",
    "/en",
    "/az",
    "/en/invoices",
    "/en/cards",
    "/en/contracts",
    "/en/documents",
    "/en/insurance",
    "/en/invoices",
    "/en/settings",
    "/en/transactions",
    "/az/invoices",
    "/az/cards",
    "/en/contact",
    "/az/contracts",
    "/az/documents",
    "/az/insurance",
    "/az/invoices",
    "/az/settings",
    "/az/contact",
    "/az/transactions",
    "/invoices",
    "/cards",
    "/contracts",
    "/documents",
    "/insurance",
    "/invoices",
    "/settings",
    "/contact",
    "/transactions",
    "/en/contracts/create",
  ];

  if (restrictedPaths.includes(path) && !token) {
    return NextResponse.redirect(new URL("/signin", request.nextUrl));
  }

  let lng;
  //@ts-ignore
  if (request.cookies.has(cookieName))
    //@ts-ignore
    lng = acceptLanguage.get(request.cookies.get(cookieName).value);
  if (!lng) lng = acceptLanguage.get(request.headers.get("Accept-Language"));
  if (!lng) lng = fallbackLng;

  // Redirect if lng in path is not supported
  if (
    !languages.some((loc) => request.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !request.nextUrl.pathname.startsWith("/_next")
  ) {
    return NextResponse.redirect(
      new URL(`/${lng}${request.nextUrl.pathname}`, request.url),
    );
  }

  if (request.headers.has("referer")) {
    //@ts-ignore

    const refererUrl = new URL(request.headers.get("referer"));
    const lngInReferer = languages.find((l) =>
      refererUrl.pathname.startsWith(`/${l}`),
    );
    const response = NextResponse.next();
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/en",
    "/az",
    "/en/invoices",
    "/en/cards",
    "/en/contracts",
    "/en/documents",
    "/en/insurance",
    "/en/invoices",
    "/en/settings",
    "/en/transactions",
    "/en/contact",
    "/az/invoices",
    "/az/cards",
    "/az/contracts",
    "/az/documents",
    "/az/insurance",
    "/az/invoices",
    "/az/settings",
    "/az/contact",
    "/az/transactions",
    "/invoices",
    "/cards",
    "/contact",
    "/contracts",
    "/documents",
    "/insurance",
    "/invoices",
    "/settings",
    "/transactions",
    "/en/contracts/create",
    "/signin",
    "/signup",
    "/en/signin",
    "/en/signup",
    "/az/signin",
    "/az/signup",
    // "/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)",
  ],
};
