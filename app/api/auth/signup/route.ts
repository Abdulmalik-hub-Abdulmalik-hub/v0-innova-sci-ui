import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { hashPassword } from '@/lib/auth';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    const hashedPassword = await hashPassword(password);
    const token = crypto.randomBytes(32).toString('hex');
    const expiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        verificationToken: token,
        verificationTokenExpiry: expiry,
      },
    });

    // NOTE: Here you would call your EmailService to send the token
    console.log(`Verification Token for ${email}: ${token}`);

    return NextResponse.json({ message: 'User created. Check email to verify.' });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
  }
}
