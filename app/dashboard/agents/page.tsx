'use client'

import { ChatbotCreator } from "@/components/dashboard/chatbot-creator"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Calendar, Edit, MessageSquare, Plus, PlusCircle } from "lucide-react"

export default function AgentsPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col md:flex-row items-start justify-start gap-3 md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Agents</h1>
          <p className="text-muted-foreground">Create and manage your AI Agents</p>
        </div>
        <div className="flex items-center space-x-2">
          <ChatbotCreator
            trigger={
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Agent
              </Button>
            }
          />

        </div>
      </div>

      {/* <Input placeholder={"Search agents by name..."} className="py-5" /> */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder for agent cards */}
        <Card>
          <CardHeader>
            <h2 className="truncate text-xl font-semibold">Agent 1</h2>
            <div className="text-muted-foreground text-sm">
              <Calendar className="inline mr-1 h-4 w-4" />
              Created: 10th June, 2025
            </div>
          </CardHeader>
          {/* <CardContent>
            <p className="text-muted-foreground">Facebook page bot for my new business.</p>
          </CardContent> */}
          <CardFooter className="space-x-2">
            <Button variant="outline" size={"sm"} className="w-full">
              <Edit /> Manage
            </Button>
            <Button variant="outline" size={"sm"} className="w-full flex items-center justify-center">
              <MessageSquare /> Chat
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <h2 className="truncate text-xl font-semibold">Agent 1</h2>
            <div className="text-muted-foreground text-sm">
              <Calendar className="inline mr-1 h-4 w-4" />
              Created: 10th June, 2025
            </div>
          </CardHeader>
          {/* <CardContent>
            <p className="text-muted-foreground">Facebook page bot</p>
          </CardContent> */}
          <CardFooter className="space-x-2">
            <Button variant="outline" size={"sm"} className="w-full">
              <Edit /> Manage
            </Button>
            <Button variant="outline" size={"sm"} className="w-full flex items-center justify-center">
              <MessageSquare /> Chat
            </Button>
          </CardFooter>
        </Card>

        <ChatbotCreator trigger={
          <Card className="cursor-pointer hover:bg-muted transition-colors duration-200 ease-in-out">
            <CardHeader>
              <h2 className="truncate text-lg text-center">Create New Chat Agent</h2>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center">
                <PlusCircle width={50} height={50} strokeWidth={0.75} className="text-muted-foreground" />
              </div>
              <div>
              </div>
            </CardContent>
          </Card>
        } />

      </div>
    </div>
  )
}
