import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/middleware";

/**
 * Next.js middleware that runs on every matched request.
 *
 * It refreshes the Supabase auth session so the user's JWT doesn't expire
 * while they're actively using the application. Unauthenticated users
 * trying to reach protected routes are redirected to /login.
 *
 * Adjust the `matcher` config below to protect the routes you need.
 */
export async function middleware(request: NextRequest) {
  const { supabase, supabaseResponse } = createClient(request);

  // Refresh the session — do NOT remove this call.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Example: redirect unauthenticated users away from /dashboard
  if (!user && request.nextUrl.pathname.startsWith("/dashboard")) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static  (static files)
     * - _next/image   (image optimisation files)
     * - favicon.ico   (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
