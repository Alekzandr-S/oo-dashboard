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

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useCurrentUser } from "@/components/providers/UserProvider"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

const officerNav = [
  {title: "Dashboard", url: "/dashboard", icon: LayoutDashboard},
  {title: "My Submissions", url: "submissions", icon: Files},
  {title: "Payments", url: "/payments", icon: CreditCard},
]

const supervisorNav = [
  {title: "Dashboard", url: "/dashboard", icon: LayoutDashboard},
  {title: "All Submissions", url: "/submissions", icon: Files},
  {title: "Team Performace", url: "/analytics/team", icon: BarChart3},
  {title: "Payments", url: "/payments", icon: CreditCard},
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
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
