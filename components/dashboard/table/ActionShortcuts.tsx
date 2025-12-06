"use client"

import { useCurrentUser } from "@/components/providers/UserProvider"
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, CreditCard, FilePlus, ListChecks, Users } from "lucide-react";
import { useRouter } from "next/navigation";

export function ActionShortcuts() {
  const {user} = useCurrentUser();
  const router = useRouter();

  if(!user) return null;

  const shortcuts = user.role === "officer"
  ? [
      { label: "Start New Application", icon: FilePlus, action: () => router.push("/dashboard") },
      { label: `Pending Payments`, icon: CreditCard, action: () => router.push("/dashboard") },
      { label: "My Submissions", icon: ListChecks, action: () => router.push("/dashboard") },
    ]
  : [
      { label: "Review Pending Approvals", icon: CheckCircle, action: () => router.push("/dashboard") },
      { label: "All Applications", icon: ListChecks, action: () => router.push("/dashboard") },
      { label: "Team Performance", icon: Users, action: () => router.push("/dashboard") },
    ]

    return (
      <div className="grid grid-cols-1 p-4 lg:p-6 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {shortcuts.map((item, i) => (
        <Card 
          key={i}
          className="group cursor-pointer border hover:shadow-md transition-all"
          onClick={item.action}
        >
          <CardHeader className="flex flex-row items-center gap-3">
            <item.icon className="size-6 text-primary group-hover:scale-110 transition" />
            <CardTitle className="text-base font-medium">
              {item.label}
            </CardTitle>
          </CardHeader>
        </Card>
      ))}
    </div>
    )
    
    
} 
  