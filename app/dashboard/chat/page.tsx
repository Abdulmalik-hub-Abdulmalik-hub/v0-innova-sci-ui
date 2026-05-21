"use client"

import { useState, useRef, useEffect } from "react"
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar"
import { ChatSidebar } from "@/components/chat/chat-sidebar"
import { ChatMessage } from "@/components/chat/chat-message"
import { ChatInput } from "@/components/chat/chat-input"
import { Sparkles, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

// Sample conversation data
type MessageRole = "assistant" | "user"
interface ChatMessage {
  id: number
  role: MessageRole
  content: string
  timestamp: Date
}

const initialMessages: ChatMessage[] = [
  {
    id: 1,
    role: "assistant",
    content: "Hello! I'm Hakeem, your AI research assistant. I can help you analyze scientific papers, explain complex concepts, and assist with your research questions. How can I help you today?",
    timestamp: new Date(Date.now() - 3600000),
  },
]

export default function ChatPage() {
  const [messages, setMessages] = useState(initialMessages)
  const [isLoading, setIsLoading] = useState(false)
  const [showChatSidebar, setShowChatSidebar] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: ChatMessage = {
      id: messages.length + 1,
      role: "user",
      content,
      timestamp: new Date(),
    }
    setMessages((prev: ChatMessage[]) => [...prev, userMessage])
    setIsLoading(true)

    // Simulate AI response
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Add AI response
    const aiResponses: Record<string, string> = {
      default: `That's an interesting question! Based on my analysis, I can provide some insights on "${content.slice(0, 50)}..."\n\nLet me break this down for you:\n\n1. **Key Concepts**: The topic you're asking about involves several interconnected principles.\n\n2. **Current Research**: Recent studies have shown promising results in this area.\n\n3. **Practical Applications**: This knowledge can be applied in various scientific contexts.\n\nWould you like me to elaborate on any of these points or explore a specific aspect in more detail?`,
    }

    const aiMessage: ChatMessage = {
      id: messages.length + 2,
      role: "assistant",
      content: aiResponses.default,
      timestamp: new Date(),
    }
    setMessages((prev: ChatMessage[]) => [...prev, aiMessage])
    setIsLoading(false)
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Main Dashboard Sidebar */}
      <DashboardSidebar />

      {/* Chat History Sidebar */}
      <ChatSidebar isOpen={showChatSidebar} onToggle={() => setShowChatSidebar(!showChatSidebar)} />

      {/* Main Chat Area */}
      <div className={`flex flex-1 flex-col transition-all duration-300 ${showChatSidebar ? "ml-80" : "ml-16"}`}>
        {/* Chat Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowChatSidebar(!showChatSidebar)}
              className="lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-semibold text-foreground">Hakeem</h1>
                <p className="text-xs text-muted-foreground">AI Research Assistant</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              New Chat
            </Button>
          </div>
        </header>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="mx-auto max-w-3xl space-y-6">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isLoading && (
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                  <Sparkles className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="flex-1 rounded-2xl rounded-tl-none bg-card p-4">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                    <div className="h-2 w-2 animate-pulse rounded-full bg-primary" style={{ animationDelay: "0.2s" }} />
                    <div className="h-2 w-2 animate-pulse rounded-full bg-primary" style={{ animationDelay: "0.4s" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <ChatInput onSend={handleSendMessage} disabled={isLoading} />
      </div>
    </div>
  )
}
