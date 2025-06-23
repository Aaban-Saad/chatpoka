import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Users, Bot, MessageSquare, Activity, Plus, TrendingUp, Settings, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data based on the schema
const mockData = {
  tenant: {
    name: "Acme Corp",
    plan: "pro" as const,
  },
  user: {
    name: "John Doe",
    email: "john@acme.com",
    role: "admin" as const,
  },
  stats: {
    totalAgents: 12,
    activeSessions: 8,
    totalUsers: 24,
    monthlyMessages: 1247,
  },
  agents: [
    {
      _id: "1",
      name: "Customer Support Bot",
      description: "Handles customer inquiries and support tickets",
      avatarUrl: "/placeholder.svg?height=40&width=40",
      persona: "Friendly Assistant",
      sharedWithTenant: true,
      collaborators: 3,
      createdAt: new Date("2024-01-15"),
    },
    {
      _id: "2",
      name: "Sales Assistant",
      description: "Helps with product recommendations and sales",
      avatarUrl: "/placeholder.svg?height=40&width=40",
      persona: "Sales Expert",
      sharedWithTenant: false,
      collaborators: 1,
      createdAt: new Date("2024-01-20"),
    },
    {
      _id: "3",
      name: "Technical Support",
      description: "Provides technical assistance and troubleshooting",
      avatarUrl: "/placeholder.svg?height=40&width=40",
      persona: "Technical Expert",
      sharedWithTenant: true,
      collaborators: 5,
      createdAt: new Date("2024-01-25"),
    },
  ],
  recentSessions: [
    {
      _id: "s1",
      agentName: "Customer Support Bot",
      userName: "Alice Johnson",
      startedAt: new Date("2024-02-01T10:30:00"),
      status: "active" as const,
      messageCount: 12,
    },
    {
      _id: "s2",
      agentName: "Sales Assistant",
      userName: "Bob Smith",
      startedAt: new Date("2024-02-01T09:15:00"),
      status: "closed" as const,
      messageCount: 8,
    },
    {
      _id: "s3",
      agentName: "Technical Support",
      userName: "Carol Davis",
      startedAt: new Date("2024-02-01T08:45:00"),
      status: "active" as const,
      messageCount: 15,
    },
  ],
}

export default function ActivitiesPage() {

  return (
    <div className="space-y-6 p-6 ">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start justify-start gap-3 md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Activities</h1>
          <p className="text-muted-foreground">Usage and activities of your workspace</p>
        </div>
        <div className="flex items-center space-x-2">
          {/* <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Agent
          </Button> */}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Agents</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.stats.totalAgents}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.stats.activeSessions}</div>
            <p className="text-xs text-muted-foreground">+12% from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">+3 new this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages This Month</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.stats.monthlyMessages.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+18% from last month</p>
          </CardContent>
        </Card>
      </div>


      {/* Recent Chat Sessions */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Chat Sessions</CardTitle>
            <CardDescription>Latest conversations across all agents</CardDescription>
          </CardHeader>
          <CardContent>
            <Table className="text-xs">
              <TableHeader>
                <TableRow>
                  <TableHead>Agent</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Messages</TableHead>
                  <TableHead>Started</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockData.recentSessions.map((session) => (
                  <TableRow key={session._id}>
                    <TableCell className="font-medium p-1">{session.agentName}</TableCell>

                    <TableCell className="p-1">
                      <Badge className="px-1" variant={session.status === "active" ? "default" : "secondary"}>{session.status}</Badge>
                    </TableCell>
                    <TableCell>{session.messageCount}</TableCell>
                    <TableCell className="text-muted-foreground p-1">
                      {session.startedAt.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Agents Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Your Agents</CardTitle>
            <CardDescription>Manage and monitor your AI agents</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 ">
            {mockData.agents.map((agent) => (
              <div key={agent._id} className="flex items-center justify-between space-x-4">
                <div className="flex items-start space-x-4">
                  <Avatar>
                    <AvatarImage src={agent.avatarUrl || "/placeholder.svg"} alt={agent.name} />
                    <AvatarFallback>
                      {agent.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-xs font-medium leading-none">{agent.name}</p>
                    <p className="text-xs text-muted-foreground">{agent.persona}</p>
                    <div className="flex flex-col md:flex-row items-start justify-start gap-2">
                      <Badge variant="outline" className="text-xs">
                        {agent.collaborators} collaborators
                      </Badge>
                      {agent.sharedWithTenant && (
                        <Badge variant="secondary" className="text-xs">
                          Shared
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      Configure
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Test Chat
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Analytics
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Create New Agent
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Usage Analytics */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Analytics</CardTitle>
          <CardDescription>Monitor your platform usage and performance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">API Calls</span>
                <span className="text-sm text-muted-foreground">2,847 / 5,000</span>
              </div>
              <Progress value={57} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Storage Used</span>
                <span className="text-sm text-muted-foreground">1.2 GB / 10 GB</span>
              </div>
              <Progress value={12} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Active Users</span>
                <span className="text-sm text-muted-foreground">18 / 25</span>
              </div>
              <Progress value={72} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

