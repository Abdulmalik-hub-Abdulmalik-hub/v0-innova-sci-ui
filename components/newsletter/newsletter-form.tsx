"use client"

import { useState } from "react"
import { Mail, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface NewsletterFormProps {
  variant?: "default" | "compact"
}

export function NewsletterForm({ variant = "default" }: NewsletterFormProps) {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      // Placeholder for newsletter signup logic
      setIsSubmitted(true)
      setEmail("")
    }
  }

  if (isSubmitted) {
    return (
      <div className={`flex items-center gap-2 ${variant === "compact" ? "mt-3" : "mt-4"}`}>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
          <Check className="h-4 w-4 text-primary" />
        </div>
        <p className="text-sm text-muted-foreground">
          Thanks for subscribing!
        </p>
      </div>
    )
  }

  if (variant === "compact") {
    return (
      <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-9 bg-secondary"
          required
        />
        <Button type="submit" size="sm" className="shrink-0">
          <ArrowRight className="h-4 w-4" />
        </Button>
      </form>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 bg-secondary pl-10"
            required
          />
        </div>
        <Button type="submit" className="h-11">
          Subscribe
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Join 10,000+ researchers. No spam, unsubscribe anytime.
      </p>
    </form>
  )
}
