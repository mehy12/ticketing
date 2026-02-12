"use client";
import ShiftingCountdown from "./countdown";
import { motion } from "framer-motion";
import ShinyButton from "./ui/shiny-button";
import Link from "next/link";
import { CalendarDays, MapPin, PartyPopper } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  return (
    <section className="container flex min-h-screen  flex-col space-y-8 bg-gradient-to-b from-transparent to-transparent/50">
      <div className="relative w-full  flex  items-center justify-center text-white overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute w-full h-full " />

        {/* Content */}
        <div className="relative z-10 text-center px-6">
          {/* Highlight Banner */}
          <motion.div
            variants={item}
            className="my-6 sm:mb-6 inline-flex items-center rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-1.5 text-sm font-medium text-yellow-400"
          >
            <PartyPopper className="mr-2 h-5 w-5" />
            <span>26th Anniversary Edition</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={item}
            className="mb-4 sm:mb-6 flex justify-center items-center"
          >
            <Image
              src="/logo.png"
              alt="Logo"
              width={500}
              height={500}
              className="mx-auto"
            />
          </motion.h1>


          {/* Tagline */}
          <motion.p
            variants={item}
            className="mb-6 sm:mb-8 max-w-3xl text-lg sm:text-xl lg:text-2xl text-white/80"
          >
            Where Talent Unites. Where Legends Rise
          </motion.p>

          {/* Event Details */}
          <motion.div
            variants={item}
            className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-white/70"
          >
            <div className="flex items-center">
              <CalendarDays className="mr-2 h-5 w-5 text-yellow-400" />
              <span className="text-base font-medium">March 27-28, 2026</span>
            </div>
            <div className="hidden sm:block text-white/50">•</div>
            <div className="flex items-center">
              <MapPin className="mr-2 h-5 w-5 text-yellow-400" />
              <span className="text-base font-medium">
                Vemana Institute of Technology, Bangalore
              </span>
            </div>
          </motion.div>



          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/passes" passHref>
              <ShinyButton variant="purple">🎟️ Get Your Passes</ShinyButton>
            </Link>
            <Link href="/events" passHref>
              <ShinyButton>📜 Explore Events</ShinyButton>
            </Link>
            <Link
              href="https://linktr.ee/Ekyam.vemanothsav"
              passHref
              target="_blank"
              rel="noopener noreferrer"
            >
              <ShinyButton variant="green">🔗 Register Now</ShinyButton>
            </Link>
          </div>

          {/* Countdown Timer */}
          <div className="mt-4">
            <ShiftingCountdown />
          </div>
        </div>
      </div>
    </section>
  );
}
