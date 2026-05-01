import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { hashPassword } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return NextResponse.json({ error: 'User exists' }, { status: 400 });

    const hashedPassword = await hashPassword(password);
    
    // Auto-assign Admin Role
    const role = email === 'innovasciailabs@gmail.com' ? 'admin' : 'free';

    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name, role }
    });

    return NextResponse.json({ message: 'User created', userId: user.id });
  } catch (error) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
