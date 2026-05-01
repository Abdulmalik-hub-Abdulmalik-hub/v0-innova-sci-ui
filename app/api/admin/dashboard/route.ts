import { NextRequest, NextResponse } from 'next/server';
import { getAuthSession, adminGuard } from '@/lib/middleware';
import { prisma } from '@/lib/db';

export async function GET(req: NextRequest) {
  const session = await getAuthSession(req);
  if (!session || !adminGuard(session.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const [totalUsers, totalSubscriptions, totalChats] = await Promise.all([
    prisma.user.count(),
    prisma.subscription.count({ where: { status: 'active' } }),
    prisma.chat.count()
  ]);

  return NextResponse.json({
    stats: {
      users: totalUsers,
      activeSubs: totalSubscriptions,
      totalInteractions: totalChats,
      systemStatus: "Healthy"
    }
  });
}
