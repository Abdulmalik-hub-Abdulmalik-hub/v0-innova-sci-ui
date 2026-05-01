"use client"

import Link from "next/link"
import { MessageSquare, Plus, Search, ChevronLeft, ChevronRight, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface ChatSidebarProps {
  isOpen: boolean
  onToggle: () => void
}

// Chat history data
const chatHistory = [
  {
    id: 1,
    title: "Quantum Mechanics Discussion",
    preview: "Wave function collapse...",
    date: "Today",
    active: true,
  },
  {
    id: 2,
    title: "Drug Discovery Research",
    preview: "Machine learning approaches...",
    date: "Today",
    active: false,
  },
  {
    id: 3,
    title: "Statistical Methods",
    preview: "Comparing different approaches...",
    date: "Yesterday",
    active: false,
  },
  {
    id: 4,
    title: "Climate Model Analysis",
    preview: "Computational methods...",
    date: "Yesterday",
    active: false,
  },
  {
    id: 5,
    title: "Protein Folding",
    preview: "AlphaFold implications...",
    date: "Mar 10",
    active: false,
  },
  {
    id: 6,
    title: "Neural Networks",
    preview: "Deep learning in science...",
    date: "Mar 8",
    active: false,
  },
]

// Group chats by date
const groupedChats = chatHistory.reduce((acc, chat) => {
  if (!acc[chat.date]) {
    acc[chat.date] = []
  }
  acc[chat.date].push(chat)
  return acc
}, {} as Record<string, typeof chatHistory>)

export function ChatSidebar({ isOpen, onToggle }: ChatSidebarProps) {
  return (
    <aside
      className={cn(
        "fixed left-64 top-0 z-30 flex h-screen flex-col border-r border-border bg-card transition-all duration-300",
        isOpen ? "w-80" : "w-0 overflow-hidden"
      )}
    >
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b border-border px-4">
        <h2 className="font-semibold text-foreground">Chat History</h2>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Plus className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={onToggle} className="h-8 w-8 p-0">
            {isOpen ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search chats..."
            className="h-9 bg-secondary pl-9"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto px-2 pb-4">
        {Object.entries(groupedChats).map(([date, chats]) => (
          <div key={date} className="mb-4">
            <div className="mb-2 px-2 text-xs font-medium text-muted-foreground">
              {date}
            </div>
            <div className="space-y-1">
              {chats.map((chat) => (
                <Link
                  key={chat.id}
                  href="#"
                  className={cn(
                    "group flex items-start justify-between rounded-lg p-3 transition-colors",
                    chat.active
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-secondary"
                  )}
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <MessageSquare className="h-4 w-4 mt-0.5 shrink-0" />
                    <div className="min-w-0">
                      <div className="font-medium text-sm truncate">
                        {chat.title}
                      </div>
                      <div className="text-xs text-muted-foreground truncate">
                        {chat.preview}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 shrink-0"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  )
}
