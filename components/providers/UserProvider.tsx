"use client"

import { createContext, useContext, useState, ReactNode, useEffect } from "react"
import { User } from "@/lib/mock/users"

interface UserContextProps {
  user: User | null
  setUser: (user: User | null) => void
  logout: () => void
}

const UserContext = createContext<UserContextProps | null>(null)

const  STORAGE_KEY = "portal-user"

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      if(saved) {
        const parsed =  JSON.parse(saved) as User
        setUser(parsed) 
      }
    } catch (error) {
      console.error("Failed to parse stored user", error)
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return
    if (user) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    } else {
      window.localStorage.removeItem(STORAGE_KEY)
    }
  }, [user]);

  const logout = () => {
    setUser(null)
    if(typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY)
    }
  }
  
  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export function useCurrentUser() {
  const ctx = useContext(UserContext)
  if (!ctx) throw new Error("useCurrentUser must be inside <UserProvider>")
  return ctx
}
