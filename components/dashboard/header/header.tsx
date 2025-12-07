"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { useCurrentUser } from "@/components/providers/UserProvider";
import { ModeToggle } from "@/components/ui/mode-toggle";

export default function Header() {
  const { user } = useCurrentUser();

  return (
    <header 
      className="flex h-14 items-center gap-4 border-b px-4"
    >
      <SidebarTrigger />
      <Separator orientation="vertical" className="h-6" />

      <div className="max-w-full flex flex-row flex-1 justify-between items-baseline">
        <div>
          <div className="flex items-center gap-2 text-sm">
            <span>Welcome,</span>
            <span className="font-semibold">{user?.name}</span>
            <span className="rounded-full bg-muted px-2 py-0.5 text-xs capitalize">
              {user?.role}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <ModeToggle />
        </div>
      </div>

    </header>
  );
}
