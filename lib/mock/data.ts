import { UserRole } from "./users"

// Mock applications
export interface Application {
  id: number
  title: string
  status: "pending" | "approved" | "rejected"
  ownerId: number
  createdAt: string
}

export interface Payment {
  id: number
  amount: number
  status: "paid" | "pending"
  applicationId: number
  ownerId: number
}

export const applications: Application[] = [
  { id: 1, title: "Business Permit", status: "pending", ownerId: 1, createdAt: "2025-01-02" },
  { id: 2, title: "Import Licence", status: "approved", ownerId: 1, createdAt: "2025-02-10" },
  { id: 3, title: "Land Document", status: "pending", ownerId: 2, createdAt: "2025-02-15" },
  { id: 4, title: "Startup Grant", status: "rejected", ownerId: 2, createdAt: "2025-03-01" },
]

export const payments: Payment[] = [
  { id: 1, amount: 300, status: "pending", applicationId: 1, ownerId: 1 },
  { id: 2, amount: 500, status: "paid", applicationId: 2, ownerId: 1 },
  { id: 3, amount: 200, status: "pending", applicationId: 3, ownerId: 2 },
]

// Analytics based on role
export function getDashboardStats(role: UserRole, userId: number) {
  if (role === "officer") {
    const myApps = applications.filter(app => app.ownerId === userId)
    const myPendingPayments = payments.filter(p => p.ownerId === userId && p.status === "pending")

    return {
      totalApps: myApps.length,
      pendingApps: myApps.filter(a => a.status === "pending").length,
      approvedApps: myApps.filter(a => a.status === "approved").length,
      pendingPayments: myPendingPayments.length,
    }
  }

  // Supervisor sees everything
  return {
    totalApps: applications.length,
    pendingApps: applications.filter(a => a.status === "pending").length,
    approvedApps: applications.filter(a => a.status === "approved").length,
    pendingPayments: payments.filter(p => p.status === "pending").length,
  }
}
