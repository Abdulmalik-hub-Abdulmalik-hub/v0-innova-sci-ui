import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth/jwt';

export async function middleware(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  // Admin Route Protection
  if (req.nextUrl.pathname.startsWith('/api/admin')) {
    if (decoded.role !== 'ADMIN') {
      return NextResponse.json({ error: "Forbidden: Admin access only" }, { status: 403 });
    }
  }

  // Staff Route Protection
  if (req.nextUrl.pathname.startsWith('/api/staff')) {
    const staffRoles = ['ADMIN', 'STAFF', 'MODERATOR', 'FINANCE', 'SUPPORT'];
    if (!staffRoles.includes(decoded.role)) {
      return NextResponse.json({ error: "Forbidden: Staff access only" }, { status: 403 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/admin/:path*', '/api/staff/:path*', '/api/chat/:path*'],
};
