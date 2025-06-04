import type React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/dashboard/app-sidebar"
import Navbar from "@/components/dashboard/navbar"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider className="overflow-hidden">
      <AppSidebar />
      <div className="flex flex-col w-full h-screen overflow-hidden">
        <div className="md:pt-2 md:pr-2 w-full flex-shrink-0">
          <Navbar />
        </div>
        <div className="flex-1 min-h-0">
          <ScrollArea className="h-full w-full">
            <div className="">{children}</div>
          </ScrollArea>
        </div>
      </div>
    </SidebarProvider>
  )
}
