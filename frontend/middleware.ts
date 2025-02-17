import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const authCookie = req.cookies.get("sessionID");

  console.log("authCookie", authCookie);

  if (!authCookie) {
    return NextResponse.redirect(new URL("/auth", req.url));
  } else {
    return NextResponse.next();
  }
}

// Appliquer le middleware à toutes les routes sauf "/auth"
export const config = {
  matcher: ["/((?!auth|_next/static|_next/image|favicon.ico).*)"],
};
