import { UserRole } from "./users"

// ---------------- Raw Application Data ----------------

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

// Seed Mock Data
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

// ---------------- Dashboard Summary Analytics ----------------

export function getDashboardStats(role: UserRole, userId: number) {
  if (role === "officer") {
    const mine = applications.filter(app => app.ownerId === userId)
    const pendingPayments = payments.filter(p => p.ownerId === userId && p.status === "pending")

    return {
      totalApps: mine.length,
      pendingApps: mine.filter(a => a.status === "pending").length,
      approvedApps: mine.filter(a => a.status === "approved").length,
      pendingPayments: pendingPayments.length,
    }
  }

  // Supervisor sees all
  return {
    totalApps: applications.length,
    pendingApps: applications.filter(a => a.status === "pending").length,
    approvedApps: applications.filter(a => a.status === "approved").length,
    pendingPayments: payments.filter(p => p.status === "pending").length,
  }
}


//  Table View Data Model

export interface ApplicationTableRow {
  id: number
  title: string
  status: "pending" | "approved" | "rejected"
  paymentStatus: "paid" | "pending"
  date: string
  owner?: string   // only visible to supervisors
}


// Convert raw data → table rows depending on user role
export function getApplicationTableData(role: UserRole | undefined, userId: number | undefined): ApplicationTableRow[] {
  const list = role === "officer"
    ? applications.filter(a => a.ownerId === userId)
    : applications

  return list.map(a => {
    const pay = payments.find(p => p.applicationId === a.id)

    return {
      id: a.id,
      title: a.title,
      status: a.status,
      paymentStatus: pay?.status ?? "pending",
      date: a.createdAt,
      owner: role === "supervisor" ? `User ${a.ownerId}` : undefined,
    }
  })
}

export function markPaymentAsPaid(appID: number) {
  const payment = payments.find((p) => p.applicationId === appID)
  if (payment) payment.status = "paid";
}

export function approveApplication(appID: number) {
  const app = applications.find((a) => a.id === appID)
  if (app) app.status = "approved";
}

export function rejectApplication(appID: number) {
  const app = applications.find((a) => a.id === appID)
  if (app) app.status = "rejected"
}