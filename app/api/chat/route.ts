import { NextRequest, NextResponse } from 'next/server';
import { getAuthSession } from '@/lib/middleware';
import { prisma } from '@/lib/db';
import { getHakeemResponse } from '@/lib/services/aiService'; // Importing the universal service

/**
 * Main Chat Endpoint
 * Handles user messaging, database persistence, and AI response generation.
 */
export async function POST(req: NextRequest) {
  // 1. Authenticate the session
  const session = await getAuthSession(req);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized Access' }, { status: 401 });
  }

  const { message, chatId } = await req.json();

  // 2. Retrieve or Initialize Chat
  let currentChatId = chatId;
  if (!currentChatId) {
    const newChat = await prisma.chat.create({
      data: { 
        title: message.substring(0, 30), 
        userId: session.id 
      }
    });
    currentChatId = newChat.id;
  }

  // 3. Persist User Message to Database
  await prisma.message.create({
    data: { 
      content: message, 
      role: 'user', 
      chatId: currentChatId 
    }
  });

  // 4. Invoke the AI Service (Hakeem)
  // This automatically selects Gemini or GPT based on your Vercel Environment Variables
  const hakeemResponse = await getHakeemResponse(message);

  // 5. Persist AI Response to Database
  const aiMsg = await prisma.message.create({
    data: { 
      content: hakeemResponse, 
      role: 'assistant', 
      chatId: currentChatId 
    }
  });

  // 6. Return response to frontend
  return NextResponse.json({ 
    response: aiMsg.content, 
    chatId: currentChatId 
  });
}
