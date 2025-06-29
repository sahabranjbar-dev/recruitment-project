import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (!request.cookies.get("userId")?.value) {
    const authpath = new URL("/auth", request.url);
    return NextResponse.redirect(authpath);
  }
  const response = NextResponse.next();

  return response;
}

export const config = {
  matcher: "/dashboard",
};
