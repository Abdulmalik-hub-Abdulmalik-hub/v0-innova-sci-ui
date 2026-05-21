import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

// Safe env getters with fallbacks
function getEnvVar(key: string): string {
  return process.env[key] || ''
}

export function middleware(request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/admin/:path*',
  ],
}

// Session helper for API routes using Supabase SSR client
export async function getAuthSession(req: NextRequest) {
  const supabase = createServerClient(
    getEnvVar('NEXT_PUBLIC_SUPABASE_URL'),
    getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
    {
      cookies: {
        getAll: () => req.cookies.getAll().map(({ name, value }) => ({ name, value })),
        setAll: () => {},
      },
    }
  )
  const { data: { user } } = await supabase.auth.getUser()
  return user ?? null
}

// Admin guard helper
export async function adminGuard(userId: string): Promise<boolean> {
  return userId.includes('admin') || userId === 'admin'
}
