'use client'

import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardFooter, CardHeader } from "@/components/ui/card"
import { useEffect } from "react"
import { useRouter } from "next/navigation"


export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard/agents");
  }, []);

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col md:flex-row items-start justify-start gap-3 md:items-center md:justify-between">
        <div>
          <Skeleton className="h-8 w-32 mb-2" />
          <Skeleton className="h-4 w-48" />
        </div>
        <div className="flex items-center space-x-2">
          <Skeleton className="h-10 w-36 rounded-md" />
        </div>
      </div>

      <Skeleton className="h-12 w-full" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-24 mb-2" />
              <Skeleton className="h-4 w-32" />
            </CardHeader>
            <CardFooter className="space-x-2">
              <Skeleton className="h-8 w-full rounded-md" />
              <Skeleton className="h-8 w-full rounded-md" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}