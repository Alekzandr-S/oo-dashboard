"use client"

import * as React from "react"
import {
  AudioWaveform,
  BarChart3,
  BookOpen,
  Bot,
  Command,
  CreditCard,
  Files,
  Frame,
  GalleryVerticalEnd,
  LayoutDashboard,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

// import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useCurrentUser } from "@/components/providers/UserProvider"
import { NavMain } from "./nav-main"

const officerNav = [
  {title: "Dashboard", href: "/dashboard", icon: LayoutDashboard},
  {title: "My Submissions", href: "/submissions", icon: Files},
  {title: "Payments", href: "/payments", icon: CreditCard},
]

const supervisorNav = [
  {title: "Dashboard", href: "/dashboard", icon: LayoutDashboard},
  {title: "All Submissions", href: "/submissions", icon: Files},
  {title: "Team Performace", href: "/analytics/team", icon: BarChart3},
  {title: "Payments", href: "/payments", icon: CreditCard},
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const {user} = useCurrentUser();
  const items = user?.role === "supervisor" ? supervisorNav : officerNav;
  
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-md text-sm font-bold">
          DP
        </div>
        <div className="grid flex-1 gap-0.5">
          <span className="font-semibold text-sm">Digital Portal</span>
          <span className="text-muted-foreground text-xs">
            {user?.role === "supervisor" ? "Supervisor" : "Officer"}
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={items} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
