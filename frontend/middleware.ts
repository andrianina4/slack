import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  console.log("MIDDLEWARE FRONTEND", req.cookies.get("sessionID"));

  // URL de ton API backend FoalTS qui vérifie l'authentification
  // const apiAuthCheck = process.env.NEXT_PUBLIC_API_URL + "/auth/check-session";
  const apiAuthCheck = "http://localhost/api/auth/check-session";

  // Récupère le cookie d'auth (ex: "session_id")
  const authCookie = req.cookies.get("sessionID"); // Change selon ton cookie réel

  if (!authCookie) {
    return NextResponse.redirect(new URL("/auth", req.url));
  } else {
    return NextResponse.next();
  }

  // Vérifier l'auth via une requête au backend FoalTS
  const response = await fetch(apiAuthCheck, {
    method: "GET",
    headers: { Cookie: `sessionID=${authCookie}` },
    credentials: "include",
  });

  // Si la session est invalide, rediriger vers /auth
  if (!response.ok) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  // Continuer si l'utilisateur est authentifié
  return NextResponse.next();
}

// Appliquer le middleware à toutes les routes sauf "/auth"
export const config = {
  matcher: ["/((?!auth|_next/static|_next/image|favicon.ico).*)"],
};
