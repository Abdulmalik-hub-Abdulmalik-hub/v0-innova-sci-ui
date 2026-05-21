import { createServerClient } from "@supabase/ssr"
export async function GET(req: Request) {
  return Response.redirect(new URL("/dashboard", req.url))
}
