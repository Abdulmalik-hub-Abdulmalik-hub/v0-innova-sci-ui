import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export async function GET() {
  try {
    const [userCount, orderTotal, chatCount] = await Promise.all([
      prisma.user.count(),
      prisma.order.aggregate({ _sum: { totalAmount: true }, where: { status: 'PAID' } }),
      prisma.chat.count()
    ]);

    return NextResponse.json({
      totalUsers: userCount,
      revenue: orderTotal._sum.totalAmount || 0,
      totalChats: chatCount
    });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
