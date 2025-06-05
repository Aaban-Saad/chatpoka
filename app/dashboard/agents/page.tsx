'use client'

import { useSession } from "next-auth/react"

export default function Agents() {
  const { data: session } = useSession()
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Agents</h1>
      <p className="text-gray-600">This is the agents page.</p>
      <p className="text-green-500 mt-4">Welcome, {session?.user?.name}!</p>
    </div>
  )
}
