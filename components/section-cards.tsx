"use client"

import { useRouter } from "next/navigation"
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
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"

function getTrend(value: number) {
  if (value === 0) return { icon: <IconTrendingDown />, percent: "-0%" }
  if (value < 3) return { icon: <IconTrendingUp />, percent: "+5%" }
  if (value < 5) return { icon: <IconTrendingUp />, percent: "+12%" }
  return { icon: <IconTrendingUp />, percent: "+18%" }
}

export default function SummaryCards() {
  const { user } = useCurrentUser()
  const router = useRouter()

  if (!user) return null

  const stats = getDashboardStats(user.role, user.id)

  const items = [
    {
      key: "total",
      label: "Total Applications",
      value: stats.totalApps,
      footer:
        user.role === "supervisor"
          ? "Across all submissions"
          : "All applications you've submitted",
      menuLabel:
        user.role === "supervisor"
          ? "View all applications"
          : "View my applications",
      href:
        user.role === "supervisor"
          ? "#"
          : "#",
    },
    {
      key: "pendingApps",
      label: "Pending Applications",
      value: stats.pendingApps,
      footer: "Awaiting processing",
      menuLabel:
        user.role === "supervisor"
          ? "View pending approvals"
          : "View my pending applications",
      href:
        user.role === "supervisor"
          ? "#"
          : "#",
    },
    {
      key: "approved",
      label: "Approved Applications",
      value: stats.approvedApps,
      footer: "Successfully reviewed",
      menuLabel: "View approved applications",
      href:
        user.role === "supervisor"
          ? "#"
          : "#",
    },
    {
      key: "pendingPayments",
      label: "Pending Payments",
      value: stats.pendingPayments,
      footer:
        user.role === "supervisor"
          ? "Total outstanding dues"
          : "Payments you need to complete",
      menuLabel:
        user.role === "supervisor"
          ? "View all pending payments"
          : "View my pending payments",
      href:
        user.role === "supervisor"
          ? "#"
          : "#",
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => {
        const trend = getTrend(item.value)

        return (
          <Card
            key={item.key}
            className="@container/card lg:bg-linear-to-t from-primary/5 to-card shadow-xs"
          >
            <CardHeader className="flex flex-row items-start justify-between gap-2">
              <div className="space-y-1">
                <CardDescription>{item.label}</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                  {item.value}
                </CardTitle>
              </div>

              <CardAction className="flex flex-col items-end gap-2">
                <Badge variant="outline" className="gap-1 flex items-center">
                  {trend.icon}
                  {trend.percent}
                </Badge>

                {/* Inline action shortcut via dropdown */}
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground"
                      aria-label={`Open actions for ${item.label}`}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuLabel>Quick actions</DropdownMenuLabel>
                    <DropdownMenuItem
                      onSelect={(e) => {
                        e.preventDefault()
                        router.push(item.href)
                      }}
                    >
                      {item.menuLabel}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardAction>
            </CardHeader>

            <CardFooter className="flex flex-col items-start gap-1.5 text-sm">
              <div className="flex gap-2 font-medium">
                {trend.percent.includes("+")
                  ? "Trending up"
                  : "Needs attention"}
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
