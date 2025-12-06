"use client"

import { createContext, useContext, useState, ReactNode, useEffect } from "react"
import { User } from "@/lib/mock/users"

interface UserContextProps {
  user: User | null
  setUser: (user: User | null) => void
  logout: () => void
  loading: boolean
}

const UserContext = createContext<UserContextProps | null>(null)

const  STORAGE_KEY = "portal-user"

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

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
    setLoading(false)
  }, []);

  useEffect(() => {
    if(!loading) {
      if(user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
      else localStorage.removeItem(STORAGE_KEY)
    }
  }, [user, loading]);

  const logout = () => {
    setUser(null)
    if(typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY)
    }
  }
  
  return (
    <UserContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </UserContext.Provider>
  )
}

export function useCurrentUser() {
  const ctx = useContext(UserContext)
  if (!ctx) throw new Error("useCurrentUser must be inside <UserProvider>")
  return ctx
}
