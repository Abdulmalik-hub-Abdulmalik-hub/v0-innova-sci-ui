import { Sparkles, User, Copy, ThumbsUp, ThumbsDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Message {
  id: number
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user"

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  return (
    <div
      className={cn(
        "flex items-start gap-4",
        isUser && "flex-row-reverse"
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
          isUser ? "bg-secondary" : "bg-primary"
        )}
      >
        {isUser ? (
          <User className="h-4 w-4 text-foreground" />
        ) : (
          <Sparkles className="h-4 w-4 text-primary-foreground" />
        )}
      </div>

      {/* Message Content */}
      <div
        className={cn(
          "group flex max-w-[80%] flex-col",
          isUser && "items-end"
        )}
      >
        {/* Name and Time */}
        <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
          <span className="font-medium">
            {isUser ? "You" : "Hakeem"}
          </span>
          <span>{formatTime(message.timestamp)}</span>
        </div>

        {/* Message Bubble */}
        <div
          className={cn(
            "rounded-2xl p-4",
            isUser
              ? "rounded-tr-none bg-primary text-primary-foreground"
              : "rounded-tl-none bg-card border border-border"
          )}
        >
          <div className="whitespace-pre-wrap text-sm leading-relaxed">
            {message.content.split("\n").map((paragraph, index) => {
              // Handle bold text with **
              const parts = paragraph.split(/(\*\*.*?\*\*)/g)
              return (
                <p key={index} className={index > 0 ? "mt-3" : ""}>
                  {parts.map((part, partIndex) => {
                    if (part.startsWith("**") && part.endsWith("**")) {
                      return (
                        <strong key={partIndex} className="font-semibold">
                          {part.slice(2, -2)}
                        </strong>
                      )
                    }
                    return part
                  })}
                </p>
              )
            })}
          </div>
        </div>

        {/* Actions (for AI messages) */}
        {!isUser && (
          <div className="mt-2 flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
            <Button variant="ghost" size="sm" className="h-7 px-2">
              <Copy className="h-3 w-3 mr-1" />
              <span className="text-xs">Copy</span>
            </Button>
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
              <ThumbsUp className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
              <ThumbsDown className="h-3 w-3" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
