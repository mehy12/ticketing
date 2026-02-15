"use client";

import Link from "next/link";
import { useState } from "react";
import { MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import Image from "next/image";
import ShinyButton from "./ui/shiny-button";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="z-100 py-4 border-b border-white/15 backdrop-blur  md:backdrop-blur-none md:border-none sticky top-0 z-20  ">
      <div className="container mx-auto px-4  ">
        <div className="flex md:justify-evenly justify-between backdrop-blur md:backdrop-blur items-center md:border border-white/15 md:p-2.5 rounded-xl max-w-2xl mx-auto relative">
          <div className="absolute inset-0 backdrop-blur -z-10"></div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 items-center  text-white/70 text-sm">
            <Link href="/" className="hover:text-white transition">
              Home
            </Link>
            <Link href="/sponsors" className="hover:text-white transition">
              Sponsors
            </Link>
            <Link href="/events" className="hover:text-white transition">
              Events
            </Link>
            <Link href="/team" className="hover:text-white transition">
              Team
            </Link>

            <Link href="/register" className="hover:text-white transition">
              <ShinyButton variant="purple">Register</ShinyButton>
            </Link>
            <Link href="/esports" className="hover:text-white transition">
              <ShinyButton variant="purple">Esports</ShinyButton>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex w-full items-center justify-between md:hidden ">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="p-0">
                  <MenuIcon className="size-24 text-white" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="border-white/15 bg-black/90 backdrop-blur-xl"
              >
                <SheetHeader>
                  <SheetTitle className="text-white">Menu</SheetTitle>
                </SheetHeader>
                <nav className="mt-8 flex flex-col gap-4">
                  <Link
                    href="/"
                    className="text-lg text-white/80 transition hover:text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    href="/sponsors"
                    className="text-lg text-white/80 transition hover:text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    Sponsors
                  </Link>
                  <Link
                    href="/events"
                    className="text-lg text-white/80 transition hover:text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    Events
                  </Link>
                  <Link
                    href="/team"
                    className="text-lg text-white/80 transition hover:text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    Team
                  </Link>

                  <Link
                    href="/register"
                    className="hover:text-white transition"
                    onClick={() => setIsOpen(false)}
                  >
                    <ShinyButton variant="purple">Register</ShinyButton>
                  </Link>
                  <Link
                    href="/esports"
                    className="hover:text-white transition "
                    onClick={() => setIsOpen(false)}
                  >
                    <ShinyButton variant="purple">Esports</ShinyButton>
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>

            {/* Centered Logo for Mobile */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Link href="/" className="flex items-center">
                <Image src={"/logo.png"} alt="Logo" height={70} width={70} />
              </Link>
            </div>

            {/* Empty div to balance the layout */}
            <div className="size-8"></div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
    </header>
  );
};
