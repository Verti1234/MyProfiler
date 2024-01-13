"use client"
import { Session } from "next-auth"
import { ReactNode } from "react"
import { SessionProvider } from "next-auth/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

interface ProvidersProps {
  session: Session | null
  children: ReactNode
}

export default function Providers({ session, children }: ProvidersProps) {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
          {children}
      </SessionProvider>
    </QueryClientProvider>
  )
}
