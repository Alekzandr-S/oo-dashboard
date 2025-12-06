"use client"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { IconTrendingUp, IconTrendingDown } from "@tabler/icons-react"
import { useCurrentUser } from "@/components/providers/UserProvider"
import { getDashboardStats } from "@/lib/mock/data"

// Temporary generated trends (we can replace later with analytics)
function getTrend(value: number) {
  if (value === 0) return { icon: <IconTrendingDown />, percent: "-0%" }
  if (value < 3) return { icon: <IconTrendingUp />, percent: "+5%" }
  if (value < 5) return { icon: <IconTrendingUp />, percent: "+12%" }
  return { icon: <IconTrendingUp />, percent: "+18%" }
}

export default function SummaryCards() {
  const { user } = useCurrentUser()
  if (!user) return null

  const stats = getDashboardStats(user.role, user.id)

  const items = [
    {
      label: "Total Applications",
      value: stats.totalApps,
      footer: user.role === "supervisor"
        ? "Across all submissions"
        : "All applications you've submitted",
    },
    {
      label: "Pending Applications",
      value: stats.pendingApps,
      footer: "Awaiting processing",
    },
    {
      label: "Approved Applications",
      value: stats.approvedApps,
      footer: "Successfully reviewed",
    },
    {
      label: "Pending Payments",
      value: stats.pendingPayments,
      footer: user.role === "supervisor"
        ? "Total outstanding dues"
        : "Payments you need to complete",
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item, i) => {
        const trend = getTrend(item.value)

        return (
          <Card key={i} className="@container/card bg-linear-to-t from-primary/5 to-card shadow-xs">
            <CardHeader>
              <CardDescription>{item.label}</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {item.value}
              </CardTitle>

              <CardAction>
                <Badge variant="outline" className="gap-1 flex items-center">
                  {trend.icon}
                  {trend.percent}
                </Badge>
              </CardAction>
            </CardHeader>

            <CardFooter className="flex flex-col items-start gap-1.5 text-sm">
              <div className="flex gap-2 font-medium">
                {trend.percent.includes("+") ? "Trending up" : "Needs attention"}
                {trend.icon}
              </div>
              <div className="text-muted-foreground">{item.footer}</div>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}
