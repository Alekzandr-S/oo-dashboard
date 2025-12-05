"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

export function NavMain({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Navigation</SidebarGroupLabel>

      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));

            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  className={cn(
                    "group flex items-center gap-2 rounded-md border-l-2 border-transparent px-3 py-2 text-sm transition-all",
                    active
                      ? "bg-accent border-primary text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground hover:border-primary/50"
                  )}
                >
                  <Link href={item.href} className="flex items-center gap-2">
                    <item.icon
                      className={cn(
                        "h-4 w-4 transition-colors",
                        active
                          ? "text-primary"
                          : "text-muted-foreground group-hover:text-primary"
                      )}
                    />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
