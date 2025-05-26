import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";

const Navbar: React.FC = () => {
  return (
    <nav className="backdrop-blur-2xl bg-primary-foreground/10 absolute z-[100] flex items-center justify-between w-full p-2 px-5 shadow-xl shadow-gray-800/10 dark:shadow-gray-800/50">
      <div>
        <Link href="/" className="text-xl font-bold text-primary-primary">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={150}
            height={100}
            className="inline-block"
          />
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <Link
          href="/features"
          className="px-4 py-2 rounded hover:bg-primary-100 transition-colors"
        >
          Features
        </Link>
        <Link
          href="/pricing"
          className="px-4 py-2 rounded hover:bg-primary-100 transition-colors"
        >
          Pricing
        </Link>
        <Link
          href="/about"
          className="px-4 py-2 rounded hover:bg-primary-100 transition-colors"
        >
          About
        </Link>
        <Link
          href="/login"
          className="px-4 py-2 rounded bg-primary-primary text-white hover:bg-primary-700 transition-colors"
        >
          <Button variant="hero" className="rounded-full font-semibold">
            Login
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
