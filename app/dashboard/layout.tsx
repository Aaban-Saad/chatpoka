import type React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/dashboard/app-sidebar"
import Navbar from "@/components/dashboard/navbar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { auth, signOut } from "@/auth"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import Image from "next/image"
import { ArrowLeftRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default async function DashboardLayout({

  children,
}: {
  children: React.ReactNode
}) {

  const session = await auth()

  console.log("Session in DashboardLayout:", session?.user.id)

  const updateUserLastSeenToMongo = async () => {
    try {
      const response = await fetch(process.env.AUTH_URL+'/api/users/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: session?.user,
        }),
      });
      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
      }
      // const data = await response.json();
      // console.log("✅ User stored:", data);
    } catch (err) {
      console.error("❌ Failed to store user:", err);
    }
  };

  const createTenant = async () => {
    const firstName = session?.user.name?.split(" ")[0] || "User";
    const workspaceName = `${firstName}'s workspace`;

    const response = await fetch(process.env.AUTH_URL + "/api/tenants/create", {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
      creatorsId: session?.user.id,
      name: workspaceName,
      plan: "free" // Default plan, can be changed later
      }),
    });
  
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Failed to create tenant");
    }
    return data;
  }

  if (!session) {
    if (typeof window !== "undefined") {
      window.location.href = "/signin"
      return null
    }

    const { redirect } = await import("next/navigation")
    redirect("/signin")
  }



  if (!session?.user.email) {
    return (
      <div className="flex items-center justify-center h-screen p-5">
        <Card className="w-full max-w-md p-6">
          <CardHeader>
            <div className="flex items-center justify-center space-x-4 mb-4">
              <Image
                src="/images/logo-500.png"
                alt="chatpoka-logo"
                width={30}
                height={30}
                className="mb-2"
              />

              <ArrowLeftRight />

              <Image
                src="/images/facebook.png"
                alt="facebook-logo"
                width={30}
                height={30}
                className="mb-2"
              />

            </div>

            <div>
              <h2 className="text-lg font-semibold">Email not found</h2>
            </div>
          </CardHeader>

          <CardContent>
            <p className="text-sm text-muted-foreground">
              Your facebook account is not linked to an email address. Please update your profile on Facebook to include an email address, or sign in with a different method.
            </p>

            <p className="mt-4 text-sm text-muted-foreground">
              If you think you do have an email address linked to your Facebook account, then go to this&nbsp;
              <a
                href="https://www.facebook.com/settings?tab=account&section=email"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white underline"
              >
                Facebook settings page
              </a>
              &nbsp;to verify or update your email address.
            </p>

          </CardContent>

          <CardFooter>
            <form
              action={async () => {
                "use server"
                await signOut()
              }}
            >
              <Button type="submit">Sign Out</Button>
            </form>
          </CardFooter>
        </Card>
      </div>
    )
  }

  updateUserLastSeenToMongo()
  createTenant()

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
