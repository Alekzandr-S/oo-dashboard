"use client"

import { createContext, useContext, useState, ReactNode } from "react"
import { User } from "@/lib/mock/users"

interface UserContextProps {
  user: User | null
  setUser: (user: User | null) => void
}

const UserContext = createContext<UserContextProps | null>(null)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export function useCurrentUser() {
  const ctx = useContext(UserContext)
  if (!ctx) throw new Error("useCurrentUser must be inside <UserProvider>")
  return ctx
}
