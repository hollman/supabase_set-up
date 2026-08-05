import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Creates a Supabase client suitable for use inside Next.js middleware.
 * Refreshes the user session cookie so it doesn't expire while browsing.
 *
 * @returns The (potentially updated) NextResponse with refreshed auth cookies.
 */
export const createClient = (request: NextRequest) => {
  // Start with an unmodified response so we can attach cookies to it.
  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    supabaseUrl!,
    supabaseKey!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
          // First set cookies on the request so the server can read them.
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          // Rebuild the response so the updated request headers are included.
          supabaseResponse = NextResponse.next({ request });
          // Also set cookies on the response so the browser receives them.
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    },
  );

  return { supabase, supabaseResponse };
};
