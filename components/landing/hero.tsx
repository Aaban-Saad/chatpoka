import Image from "next/image";
import { Spotlight } from "../ui/spotlight-new";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { auth } from "@/auth";

export default async function Hero() {

  const session = await auth();

  return (
    <section className="max-w-screen-2xl mx-auto mt-24 md:mt-36 px-5 md:px-16 ">

      {/* <span className="hidden md:block"> */}
      <Spotlight />
      {/* </span> */}

      <div className="flex flex-col lg:flex-row items-center justify-center sm:items-start gap-4 text-center sm:text-left">

        <div className="space-y-5 md:space-y-10">
          <h1 className="font-bold text-4xl md:text-6xl">
            <span className="bg-gradient-to-r from-rose-400 to-indigo-600 bg-clip-text text-transparent">
              Automate{" "}
            </span>
            your business with
            intelligent chatbots
          </h1>
          <p className="text-lg">
            Automate your customer service, significantly boost sales, and gather crucial insights. With Chatpoka&apos;s powerful AI engine, you can build, customize, and launch sophisticated chatbots—no coding required.
          </p>

          <div className="flex flex-col md:flex-row items-center gap-3">
            <a href= {session?.user ? "/dashboard" : "/signin"}>
              <Button
                size="lg"
                variant="hero"
                className="rounded-full font-semibold"
              >
                Get Started Today
                <ArrowRight className="w-5 h-5 ml-1" />
              </Button>
            </a>

            <Button
              size="lg"
              variant="secondary"
              className="rounded-full font-semibold"
            >
              Learn More
            </Button>
          </div>
        </div>

        <Image
          src="/images/hero.webp"
          alt="Hero Image"
          width={450}
          height={400}
          className="w-full max-w-2xl rounded-lg shadow-lg"
        />
      </div>
    </section>
  );

}