"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getDashboardStats } from "@/lib/mock/data"
import { useCurrentUser } from "@/components/providers/UserProvider"
import { useRouter } from "next/navigation"
import { MoreHorizontal } from "lucide-react"
import { 
  DropdownMenu, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuLabel, 
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export default function SummaryCards() {
  const { user } = useCurrentUser()
  const router = useRouter()

  if (!user) return null

  const stats = getDashboardStats(user.role, user.id)

  const items = [
    {
      label: "Total Applications",
      value: stats.totalApps,
      actions: [
        { label: "View All Applications", onClick: () => router.push("/submissions") }
      ]
    },
    {
      label: "Pending Applications",
      value: stats.pendingApps,
      actions: user.role === "supervisor"
        ? [
            { label: "Review Pending", onClick: () => router.push("/submissions?status=pending") }
          ]
        : [
            { label: "Track My Submissions", onClick: () => router.push("/submissions") }
          ]
    },
    {
      label: "Approved",
      value: stats.approvedApps,
      actions: [
        { label: "View Approved", onClick: () => router.push("/submissions?status=approved") }
      ]
    },
    {
      label: "Pending Payments",
      value: stats.pendingPayments,
      actions: user.role === "officer"
        ? [
            { label: "View Pending Payments", onClick: () => router.push("/payments?status=pending") }
          ]
        : [
            { label: "View All Pending Payments", onClick: () => router.push("/payments") }
          ]
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
      {items.map((item, i) => (
        <Card key={i} className="relative group hover:shadow transition-all">
          
          {/* More options dropdown */}
          {item.actions && (
            <div className="absolute right-2 top-2 opacity-75 group-hover:opacity-100 transition">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6 p-0">
                    <MoreHorizontal size={16}/>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
                  {item.actions.map((a, index) => (
                    <DropdownMenuItem 
                      key={index} 
                      onSelect={(e) => {
                        e.preventDefault()
                        a.onClick()
                      }}
                    >
                      {a.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}

          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Item</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-2xl font-bold">{item.value}</p>
          </CardContent>

        </Card>
      ))}
    </div>
  )
}
