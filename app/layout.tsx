import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { SpeedInsights } from "@vercel/speed-insights/next"
import './globals.css'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: 'InnovaSci AI Labs',
  description: 'AI-Powered Scientific Research Platform',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
