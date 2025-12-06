"use client"

import "../globals.css";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/sidebar/app-sidebar";
import { useCurrentUser } from "@/components/providers/UserProvider";
import { useRouter } from "next/navigation";
import { use, useEffect } from "react";
import Header from "@/components/dashboard/header/header";
// import { AppSidebar } from "@/components/app-sidebar";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {user} = useCurrentUser();
  const router = useRouter()

  // useEffect(() => {
  //   if(!user) {
  //     router.replace("/login")
  //   }
  // }, [user])

  if (!user) return null
  
  return (
    <SidebarProvider>
      {/* <AppSidebar /> */}
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main className="p4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
