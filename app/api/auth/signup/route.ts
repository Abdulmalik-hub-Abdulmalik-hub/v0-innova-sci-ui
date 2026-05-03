import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

/**
 * EMAIL VERIFICATION HANDLER
 * This route validates the token from the email link and activates the user account.
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');

    // 1. Check if token is provided
    if (!token) {
      return NextResponse.json({ error: 'Missing verification token.' }, { status: 400 });
    }

    // 2. Find user with this token and check if token has not expired
    const user = await prisma.user.findFirst({
      where: {
        verificationToken: token,
        verificationTokenExpiry: {
          gt: new Date(), // Check if expiry date is greater than "now"
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid or expired verification token.' },
        { status: 400 }
      );
    }

    // 3. Update user status to verified and clear tokens
    await prisma.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        verificationToken: null,
        verificationTokenExpiry: null,
      },
    });

    // 4. Redirect to login page with a success message
    // Note: Ensure your frontend handles the 'verified=true' query param
    return NextResponse.redirect(new URL('/login?verified=true', req.url));

  } catch (error) {
    console.error('VERIFICATION_ERROR:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
