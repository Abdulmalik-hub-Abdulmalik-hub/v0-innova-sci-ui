import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'InnovaSci AI Labs',
  description: 'AI-Powered Scientific Research Platform',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background text-foreground">
        {children}
      </body>
    </html>
  )
}
