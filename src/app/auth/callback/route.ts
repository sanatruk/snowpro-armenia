import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";

function sanitizeRedirectPath(path: string): string {
  // Only allow relative paths starting with / and no protocol tricks
  if (!path.startsWith("/") || path.startsWith("//") || path.includes("://")) {
    return "/";
  }
  return path;
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = sanitizeRedirectPath(searchParams.get("next") ?? "/");

  if (code) {
    const supabase = await createServerSupabase();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Auth error — redirect to login with error
  return NextResponse.redirect(`${origin}/auth/login?error=auth_failed`);
}
