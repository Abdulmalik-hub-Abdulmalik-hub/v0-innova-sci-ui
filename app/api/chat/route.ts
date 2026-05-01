import { NextRequest, NextResponse } from 'next/server';
import { getAuthSession } from '@/lib/middleware';
import { prisma } from '@/lib/db';

/**
 * Hakeem AI Chat Logic
 */
export async function POST(req: NextRequest) {
  const session = await getAuthSession(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { message, chatId } = await req.json();

  // 1. Create or get chat
  const currentChat = chatId || (await prisma.chat.create({
    data: { title: message.substring(0, 30), userId: session.id }
  })).id;

  // 2. Save User Message
  await prisma.message.create({
    data: { content: message, role: 'user', chatId: currentChat }
  });

  // 3. Mock Hakeem Response
  const hakeemResponse = `As InnovaSci's assistant, I've analyzed your query: "${message}". In a research context, this suggests... [Scientific Insight Placeholder]`;

  // 4. Save AI Message
  const aiMsg = await prisma.message.create({
    data: { content: hakeemResponse, role: 'assistant', chatId: currentChat }
  });

  return NextResponse.json({ response: aiMsg.content, chatId: currentChat });
}
