import Hero from "@/components/landing/hero";
import  Navbar  from "@/components/landing/navbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { StarsBackground } from "@/components/ui/stars-background";

export default function Home() {
  return (
    <>
    <ScrollArea className="w-screen h-screen z-10">
    <Navbar />
      <div className="grid grid-rows-[20px_1fr_20px] overflow-hidden items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-5 row-start-2 items-center sm:items-start">
          <Hero />
        </main>
      </div>
    </ScrollArea>

    <StarsBackground />
    </>
  );
}
