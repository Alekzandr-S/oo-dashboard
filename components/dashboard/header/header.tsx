"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { useCurrentUser } from "@/components/providers/UserProvider";

export default function Header() {
  const { user } = useCurrentUser();

  return (
    <header 
      className="flex h-14 items-center gap-4 border-b px-4"
      // className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12"
    >
      <SidebarTrigger />
      <Separator orientation="vertical" className="h-6" />

      <div className="flex items-center gap-2 text-sm">
        <span>Welcome,</span>
        <span className="font-semibold">{user?.name}</span>
        <span className="rounded-full bg-muted px-2 py-0.5 text-xs capitalize">
          {user?.role}
        </span>
      </div>

      <div className="ml-auto flex items-center gap-2">
        {/* placeholders for search, notifications, theme toggle, avatar later */}
      </div>
    </header>
  );
}
