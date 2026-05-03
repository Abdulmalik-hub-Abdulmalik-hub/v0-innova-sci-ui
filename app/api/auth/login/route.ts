import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { comparePasswords, signToken } from '@/lib/auth';

/**
 * PRODUCTION LOGIN HANDLER
 * Validates credentials and enforces account verification.
 */
export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // 1. Find user and include sensitive fields for validation
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    // 2. BLOCK ACCESS if the account is not verified
    if (!user.isVerified) {
      return NextResponse.json(
        { 
          error: 'Account not verified. Please check your email.',
          code: 'UNVERIFIED' 
        },
        { status: 403 }
      );
    }

    // 3. Verify the hashed password
    const isPasswordValid = await comparePasswords(password, user.password);
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    // 4. Create a session token (JWT)
    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // 5. Return success with user details (excluding password)
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
    console.error('LOGIN_CRITICAL_ERROR:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
