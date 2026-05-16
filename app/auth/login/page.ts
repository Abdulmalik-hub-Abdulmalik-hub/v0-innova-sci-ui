export const dynamic = "force-dynamic";
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { comparePassword } from '@/lib/auth';
import { signToken } from '@/lib/auth/jwt';

/**
 * PRODUCTION LOGIN HANDLER
 * Enforces email verification and secure authentication.
 */
export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // 1. Fetch user from database
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // 2. Security Check: Generic error if user is not found
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    // 3. CORE REQUIREMENT: Block unverified users
    if (!user.isVerified) {
      return NextResponse.json(
        { 
          error: 'Please verify your email address before logging in.',
          code: 'UNVERIFIED_ACCOUNT'
        },
        { status: 403 }
      );
    }

    // 4. Verify password security
    const isPasswordValid = await comparePassword(password, user.password);
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    // 5. Generate secure JWT for the session
    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // 6. Return successful response
    return NextResponse.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });

  } catch (error) {
    console.error('LOGIN_ERROR:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred during login.' },
      { status: 500 }
    );
  }
}
