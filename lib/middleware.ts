import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

// Safe env getter
function getEnv(key: string): string {
  return process.env[key] || ''
}

export function middleware(request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/admin/:path*'],
}

/**
 * getAuthSession - Standard Supabase SSR session retrieval
 * Used in API routes to get authenticated user from cookies
 */
export async function getAuthSession(req: NextRequest) {
  const supabase = createServerClient(
    getEnv('NEXT_PUBLIC_SUPABASE_URL'),
    getEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
    {
      cookies: {
        getAll: () => req.cookies.getAll().map(c => ({ name: c.name, value: c.value })),
        setAll: () => {},
      },
    }
  )
  const { data: { user } } = await supabase.auth.getUser()
  return user ?? null
}

/**
 * adminGuard - Check if user is admin
 */
export async function adminGuard(userId: string): Promise<boolean> {
  return userId.includes('admin') || userId === 'admin'
}
