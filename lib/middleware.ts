import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken, type JWTPayload } from '@/lib/auth';

export interface AuthSession extends JWTPayload {
  id: string;
}

/**
 * Extract and verify the auth session from request headers or cookies
 */
export async function getAuthSession(request: NextRequest): Promise<AuthSession | null> {
  try {
    // Check Authorization header first
    const authHeader = request.headers.get('Authorization');
    let token: string | undefined;

    if (authHeader?.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    } else {
      // Fall back to cookie
      token = request.cookies.get('auth-token')?.value;
    }

    if (!token) {
      return null;
    }

    const payload = verifyToken(token);
    if (!payload) {
      return null;
    }

    return {
      id: payload.userId,
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
    };
  } catch {
    return null;
  }
}

/**
 * Check if the user has admin privileges
 */
export function adminGuard(role: string): boolean {
  return role === 'admin' || role === 'ADMIN';
}

/**
 * Main middleware function for route protection
 */
export function middleware(request: NextRequest) {
  // Allow all requests to pass through for now
  // Route protection is handled at the API level
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/admin/:path*',
  ],
};
