"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { useCurrentUser } from "@/components/providers/UserProvider"
import { applications } from "@/lib/mock/data"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction,
} from "@/components/ui/card"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart"
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

/* ---------------- Month-based curved dataset ---------------- */
function getMonthlyData(role:string, userId:number){
  const filtered =
    role === "supervisor" ? applications :
    applications.filter(a=>a.ownerId===userId)

  const counts = filtered.reduce((acc,app)=>{
    const month = new Date(app.createdAt).toLocaleString("default",{month:"short"})
    acc[month]=(acc[month]||0)+1
    return acc
  },{} as Record<string,number>)

  const monthOrder=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
  const ordered = monthOrder.filter(m=>counts[m])

  return ordered.map((m,i)=>({
    date:`2025-${String(i+1).padStart(2,"0")}-01`,  // <- real valid date
    label:m,                                       // <- for display
    applications:counts[m]
  }))
}

const chartConfig:ChartConfig={
  total:{label:"Applications",color:"oklch(var(--chart-1))"}
}

export function ApplicationsOverTime(){
  const {user}=useCurrentUser()
  const [range,setRange]=React.useState("all")
  if(!user)return null

  const raw=getMonthlyData(user.role,user.id)
  const data=range==="7d"?raw.slice(-1):range==="30d"?raw.slice(-2):raw

  return(
    <Card 
      className="w-full h-full @container/card 
             shadow-sm hover:shadow-md 
             transition-all duration-200 
             hover:-translate-y-0.5"
    >
      <CardHeader>
        <CardTitle>Applications Over Time</CardTitle>
        <CardDescription>
          {user.role==="supervisor"?"Monthly submission trend":"Your applications over time"}
        </CardDescription>

        <CardAction>
          <ToggleGroup type="single" value={range} onValueChange={setRange} variant="outline" className="hidden @[600px]/card:flex">
            <ToggleGroupItem value="all">All</ToggleGroupItem>
            <ToggleGroupItem value="30d">Recent</ToggleGroupItem>
            <ToggleGroupItem value="7d">Latest</ToggleGroupItem>
          </ToggleGroup>

          <Select value={range} onValueChange={setRange}>
            <SelectTrigger className="w-32 @[600px]/card:hidden">
              <SelectValue placeholder="All time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="30d">Recent</SelectItem>
              <SelectItem value="7d">Latest</SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>

      <CardContent className="px-2 pt-3 sm:px-4">
        <ChartContainer config={chartConfig} className="h-[260px] w-full animate-[fadeInUp_0.35s_ease-out]">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="fillApps">
                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0.08}/>
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false}/>
            <XAxis
              dataKey="label"
              tickMargin={8}
            />
            <YAxis hide/>

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot"/>}
            />

            <Area
              dataKey="applications"
              type="natural"                  
              fill="url(#fillApps)"
              stroke="var(--primary)"
              strokeWidth={2.2}
              dot={{r:4}}
              activeDot={{r:6,stroke:"white",strokeWidth:1}}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
