"use client"
import { createContext, useContext, useState } from "react"
import { applications as initialApps, payments as initialPayments } from "@/lib/mock/data"

interface DashboardContextProps {
  applications: typeof initialApps
  payments: typeof initialPayments
  updateApplications: (fn:(apps:any)=>any)=>void
  updatePayments: (fn:(p:any)=>any)=>void
}

const DashboardContext = createContext<DashboardContextProps | null>(null)

export function DashboardDataProvider({ children }: {children:React.ReactNode}) {
  const [applications, setApplications] = useState(initialApps)
  const [payments, setPayments] = useState(initialPayments)

  return (
    <DashboardContext.Provider value={{
      applications,
      payments,
      updateApplications:(fn)=>setApplications(a=>fn([...a])),
      updatePayments:(fn)=>setPayments(p=>fn([...p]))
    }}>
      {children}
    </DashboardContext.Provider>
  )
}

export function useDashboardData(){
  const ctx = useContext(DashboardContext)
  if(!ctx) throw new Error("useDashboardData must be inside DashboardDataProvider")
  return ctx
}
