import Features from "@/components/landing/features";
import Footer from "@/components/landing/footer";
import Hero from "@/components/landing/hero";
import Navbar from "@/components/landing/navbar";
import { DotGridBG } from "@/components/ui/dot-grid";
import { ScrollArea } from "@/components/ui/scroll-area";
import { StarsBackground } from "@/components/ui/stars-background";

export default function Home() {
  return (
    <>
      <ScrollArea className="h-screen z-10 font-[family-name:var(--font-geist-sans)]">
        <Navbar />

        <main className="flex flex-col gap-24 items-center sm:items-start">
          <Hero />
          <DotGridBG>
            <Features />
          </DotGridBG>
        </main>
        
        <Footer />
      </ScrollArea>
      <StarsBackground />
    </>
  );
}
