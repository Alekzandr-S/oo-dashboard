"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getDashboardStats } from "@/lib/mock/data"
import { useCurrentUser } from "@/components/providers/UserProvider"

export default function SummaryCards() {
  const { user } = useCurrentUser()

  if (!user) return null

  const stats = getDashboardStats(user.role, user.id)

  const items = [
    { label: "Total Applications", value: stats.totalApps },
    { label: "Pending Applications", value: stats.pendingApps },
    { label: "Approved", value: stats.approvedApps },
    { label: "Pending Payments", value: stats.pendingPayments },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
      {items.map((item) => (
        <Card key={item.label} className="hover:shadow transition-all">
          <CardHeader>
            <CardTitle className="text-sm font-medium">{item.label}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{item.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
