import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from "@/components/ui/sonner"
import { GeistSans } from 'geist/font/sans';
import Providers from '@/components/Providers';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'MyProfiler',
  description: 'Aplikacja do zarządzania  profilem',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  return (
    <html lang="pl">
      <body className={GeistSans.className}>
        <Providers session={session}>

        <main>
          {children}
          <Toaster />
        </main>
        </Providers>
      </body>
    </html>
  )
}
