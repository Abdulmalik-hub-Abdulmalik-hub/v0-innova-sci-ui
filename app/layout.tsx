import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from "@vercel/analytics/next" // Na ƙara wannan
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
  title: 'InnovaSci AI Labs - AI-Powered Scientific Research Platform',
  description: 'Accelerate your scientific research with AI-powered tools. Chat with Hakeem, our AI assistant, analyze research papers, and run simulations.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark bg-background">
      <body className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
        {/* Wannan zai baka damar ganin yadda mutane ke amfani da site din */}
        <Analytics />
        {/* Wannan kuma zai nuna maka saurin shafin a Vercel Dashboard */}
        <SpeedInsights />
      </body>
    </html>
  )
}
