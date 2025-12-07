"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, Pie, PieChart, Cell, Tooltip, ResponsiveContainer } from "recharts"

import { useCurrentUser } from "@/components/providers/UserProvider"
import { getApplicationTableData } from "@/lib/mock/data"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useIsMobile } from "@/hooks/use-mobile"

// ---------------------- Chart Logic ----------------------

export function AnalyticsSection() {
  const { user } = useCurrentUser()
  if (!user) return null

  const data = getApplicationTableData(user.role, user.id)

  // Generate mock growth values over time using created date
  const groupedByMonth = data.reduce((acc, item) => {
    const month = new Date(item.date).toLocaleString("en-US", { month: "short" })
    acc[month] = (acc[month] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const areaChartData = Object.keys(groupedByMonth).map(m => ({
    date: m,
    applications: groupedByMonth[m],
  }))

  // Distribution chart
  const pending = data.filter(d => d.status === "pending").length
  const approved = data.filter(d => d.status === "approved").length
  const rejected = data.filter(d => d.status === "rejected").length

  const donutData = [
    { name: "Pending", value: pending, color: "#facc15" },
    { name: "Approved", value: approved, color: "#22c55e" },
    { name: "Rejected", value: rejected, color: "#ef4444" },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-4 lg:px-6 mt-8">

      {/* ─── Chart 1 — Applications Over Time (spans 2 columns) ────────────── */}
      <Card className="lg:col-span-2 @container/card">
        <ChartHeader title="Applications Over Time" description="Monthly submission trend" />
        
        <CardContent className="px-2 pb-6 sm:px-6">
          <ChartContainer config={areaConfig} className="h-[260px]">
            <AreaChart data={areaChartData}>
              <defs>
                <linearGradient id="fillApps" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="var(--primary)" stopOpacity={0.05}/>
                </linearGradient>
              </defs>

              <CartesianGrid vertical={false}/>
              <XAxis dataKey="date" tickMargin={10}/>
              <ChartTooltip content={<ChartTooltipContent indicator="line"/>}/>
              <Area
                dataKey="applications"
                type="natural"
                fill="url(#fillApps)"
                stroke="var(--primary)"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* ─── Chart 2 — Pending vs Completed Distribution ───────────────── */}
      <Card className="@container/card flex flex-col justify-center">
        <ChartHeader title="Applications Status Distribution" description="Pending vs Approved vs Rejected"/>
        
        <CardContent className="flex justify-center items-center h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={donutData}
                innerRadius={60}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
              >
                {donutData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

// ------------ Small shared header component ----------------
function ChartHeader({ title, description }: { title: string, description: string }) {
  return (
    <CardHeader>
      <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
      <CardAction className="mt-1">
        <ToggleGroup type="single" defaultValue="m" variant="outline">
          <ToggleGroupItem value="m" className="px-2">Monthly</ToggleGroupItem>
          <ToggleGroupItem value="y" className="px-2">Year</ToggleGroupItem>
        </ToggleGroup>
      </CardAction>
    </CardHeader>
  )
}

// Recharts config
const areaConfig: ChartConfig = {
  applications: {
    label: "Applications",
    color: "var(--primary)",
  }
}
