import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from "@/components/ui/sonner"
import { GeistSans } from 'geist/font/sans';

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'MyProfiler',
  description: 'Aplikacja do zarządzania swoimi danymi osobowymi',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <main>
          {children}
          <Toaster />
        </main>
      </body>
    </html>
  )
}
