import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { auth } from "@/auth";

const Navbar: React.FC = async () => {
  const session = await auth()

  return (
    <nav className="py-3 backdrop-blur-2xl bg-primary-foreground/40 absolute z-[100] p-2 px-5 shadow-xl shadow-gray-800/10 dark:shadow-gray-800/50 w-full">
      <div className="flex items-center justify-between w-full max-w-screen-2xl mx-auto">
        <div>
          <Link href="/" className="text-xl font-bold text-primary-primary">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={150}
              height={32}
              className="inline-block"
            />
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/features"
            className="rounded hover:bg-primary-100 transition-colors"
          >
            Features
          </Link>
          <Link
            href="/pricing"
            className="rounded hover:bg-primary-100 transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/about"
            className="rounded hover:bg-primary-100 transition-colors"
          >
            About
          </Link>

          {session ? (
            <>
              <a
                href="/dashboard/agents"
                className="rounded bg-primary-primary text-white hover:bg-primary-700 transition-colors"
              >
                <Button variant="hero" className="rounded-full font-semibold">
                  My Agents
                </Button>
              </a>
              {/* <a
                href="/dashboard"
                className="rounded bg-primary-primary text-white hover:bg-primary-700 transition-colors"
              >
                <Button variant="hero" className="rounded-full font-semibold">
                  Dashboard
                </Button>
              </a> */}
            </>
          ) : (
            <a
              href="/signin"
              className="rounded bg-primary-primary text-white hover:bg-primary-700 transition-colors"
            >
              <Button variant="hero" className="rounded-full font-semibold">
                Sign In
              </Button>
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
