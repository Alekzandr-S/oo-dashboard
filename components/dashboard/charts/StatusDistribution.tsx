"use client"

import { Pie, PieChart, Cell, Legend, Tooltip } from "recharts"
import { useCurrentUser } from "@/components/providers/UserProvider"
import { applications } from "@/lib/mock/data"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

// Use your custom color variables
const STATUS_COLORS: Record<"Approved" | "Pending" | "Rejected", string> = {
  Rejected: "#fb2c36",
  Approved: "#57C785",
  Pending: "#EDDD53",
}


function getStatusData(role: string, userId: number) {
  const filtered = role === "supervisor"
    ? applications
    : applications.filter(a => a.ownerId === userId)

  return [
    { name: "Approved", value: filtered.filter(a => a.status === "approved").length },
    { name: "Pending", value: filtered.filter(a => a.status === "pending").length },
    { name: "Rejected", value: filtered.filter(a => a.status === "rejected").length },
  ]
}

export function StatusDistribution() {
  const { user } = useCurrentUser()
  if (!user) return null

  const data = getStatusData(user.role, user.id)

  return (
    <Card className="w-full h-full @container/card 
             shadow-sm hover:shadow-md 
             transition-all duration-200 
             hover:-translate-y-0.5">
      <CardHeader>
        <CardTitle>Application Status Distribution</CardTitle>
        <CardDescription className="text-sm">
          {user.role === "supervisor" ? "Overall workflow activity" : "Your submissions overview"}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex justify-center pt-4">
        <PieChart width={260} height={260}>
          <Pie data={data} dataKey="value" nameKey="name" innerRadius={70} outerRadius={100}>
            {data.map((entry, index) => (
              <Cell key={index} fill={STATUS_COLORS[entry.name as keyof typeof STATUS_COLORS]} strokeWidth={3} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </CardContent>
    </Card>
  )
}
