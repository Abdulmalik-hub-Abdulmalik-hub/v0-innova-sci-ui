import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(req: Request) {
  const { email } = await req.json();

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    
    await prisma.newsletterSubscriber.create({
      data: {
        email,
        planTag: user?.role || 'visitor'
      }
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: 'Already subscribed' }, { status: 400 });
  }
}
