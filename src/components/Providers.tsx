"use client"
import { Session } from "next-auth"
import { ReactNode } from "react"
import { SessionProvider } from "next-auth/react"

interface ProvidersProps {
  session: Session | null
  children: ReactNode
}

export default function Providers({ session, children }: ProvidersProps) {

  return (
      <SessionProvider session={session}>
          {children}
      </SessionProvider>
  )
}
