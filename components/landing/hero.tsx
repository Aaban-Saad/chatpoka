import Image from "next/image";
import { Spotlight } from "../ui/spotlight-new";
import { StarsBackground } from "../ui/stars-background";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section>

      <span className="hidden md:block">
        <Spotlight />
      </span>

      <div className="flex items-center justify-center sm:items-start gap-4 text-center sm:text-left">

        <div>

          <h1 className="font-bold text-6xl">
            <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              Automate{" "}
            </span>
            your business with
            intelligent chatbots
          </h1>
          

          <p className="text-lg mt-3">Automate your customer service, significantly boost sales, and gather crucial insights. With Chatpoka's powerful AI engine, you can build, customize, and launch sophisticated chatbots—no coding required.</p>

        </div>

        <Image
          src="/images/hero.webp"
          alt="Hero Image"
          width={450}
          height={400}
          className="w-full max-w-2xl rounded-lg shadow-lg"
        />
      </div>

      <div className="mt-3 flex items-center gap-3">
        <Button
          size="lg"
          variant="hero"
          className="rounded-full font-semibold"
        >
          Get Started Today
          <ArrowRight className="w-5 h-5 ml-1" />
        </Button>
        
        <Button
          size="lg"
          variant="secondary"
          className="rounded-full font-semibold"
        >
          Learn More
        </Button>
      </div>

    </section>
  );

}