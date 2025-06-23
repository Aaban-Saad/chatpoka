"use client"

import type * as React from "react"
import {
  Bot,
  MessageSquare,
  Users,
  Settings,
  BarChart3,
  Wrench,
  LogOut,
  User,
  ChevronUp,
  Plus,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { logout } from "@/lib/auth"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { IMembership } from "@/models/memberships"
import { Skeleton } from "../ui/skeleton"
import { useRouter } from "next/navigation"

// Menu items based on the schema structure
const data = {
  navMain: [
    {
      title: "Agents",
      url: "/dashboard/agents",
      icon: Bot,
    },
    {
      title: "Chat Sessions",
      url: "/dashboard/sessions",
      icon: MessageSquare,
    },
    {
      title: "Team",
      url: "/dashboard/team",
      icon: Users,
    },
    {
      title: "Tools",
      url: "/dashboard/tools",
      icon: Wrench,
    },
    {
      title: "Activities",
      url: "/dashboard/activities",
      icon: BarChart3,
    }
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings,
    },
  ],
}

interface tenantMembership extends IMembership {
  tenantName?: string | null
  plan?: string | null
  image?: string | null
}


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const route = useRouter()

  const { data: session } = useSession()

  const [memberships, setMemberships] = useState<tenantMembership[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!session?.user?.id) return;
    if (memberships.length > 0) return;
    
    setLoading(true)
    
    fetch("/api/memberships/get", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: session.user.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMemberships(data)
      })
      .catch((error) => {
        console.error("Error fetching memberships:", error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [session, route])

  if (loading) {
    return (
      <Sidebar variant="floating" collapsible="icon" {...props}>
        <SidebarHeader>
          <div className="flex items-center gap-3 w-full">
            <Skeleton className="w-8 h-8 rounded-lg" />
            <div className="flex flex-col flex-1 gap-1">
              <Skeleton className="h-4 w-24 rounded" />
              <Skeleton className="h-3 w-16 rounded" />
            </div>
            <Skeleton className="w-5 h-5 rounded" />
          </div>
          <div className="mt-10">
            <Skeleton className="mt-4 h-4 w-32 rounded" />
            <Skeleton className="mt-4 h-4 w-32 rounded" />
            <Skeleton className="mt-4 h-4 w-32 rounded" />
            <Skeleton className="mt-4 h-4 w-32 rounded" />
          </div>
        </SidebarHeader>
      </Sidebar>
    )
  }

  return (
    <Sidebar variant="floating" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={memberships[0]?.image || "/placeholder.svg"} alt={"user image"} />
                      <AvatarFallback className="rounded-lg">
                        {(memberships[0]?.tenantName ?? "Aaban Saad")
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                        }
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{memberships[0]?.tenantName}</span>
                    <span className="truncate text-xs capitalize">{memberships[0]?.plan} plan</span>
                  </div>
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                align="start"
                side="bottom"
                sideOffset={4}
              >
                <DropdownMenuItem>
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={memberships[0]?.image || "/placeholder.svg"} alt={"user image"} />
                    <AvatarFallback className="rounded-lg">
                      {(memberships[0]?.tenantName ?? "Aaban Saad")
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                      }
                    </AvatarFallback>
                  </Avatar>
                  Tenant Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Plus className="mr-2 h-4 w-4" />
                  Upgrade Plan
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navSecondary.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={session?.user.image || "/placeholder.svg"} alt={"user image"} />
                    <AvatarFallback className="rounded-lg">
                      {(session?.user?.name ?? "Aaban Saad")
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                      }
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{session?.user.name}</span>
                    <span className="truncate text-xs">{session?.user.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Badge variant="outline" className="text-xs capitalize">
                      {memberships[0]?.role}
                    </Badge>
                    <ChevronUp className="ml-2" />
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => logout()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
