"use client";
import ShiftingCountdown from "./countdown";
import { motion } from "framer-motion";
import ShinyButton from "./ui/shiny-button";
import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-transparent to-transparent/50">
      <div className="container mx-auto px-6 pt-4 md:pt-16 flex min-h-screen items-center justify-center text-white">
        <div className="w-full text-center">

          {/* Banner */}
          <motion.div
            variants={item}
            initial="hidden"
            animate="show"
            className="flex justify-center mb-0 md:mb-0"
          >
            <Image
              src="/bannerr.png"
              alt="Vemana Institute Banner"
              width={1600}
              height={400}
              priority
              className="w-[340px] sm:w-[450px] md:w-[600px] lg:w-[750px] xl:w-[950px] h-auto"
            />
          </motion.div>

          {/* Ikyam Logo */}
          <motion.h1
            variants={item}
            initial="hidden"
            animate="show"
            className="mb-1 md:mb-1 flex justify-center"
          >
            <Image
              src="/logo.png"
              alt="Ikyam Logo"
              width={5000}
              height={5000}
              className="w-[260px] sm:w-[360px] md:w-[430px] lg:w-[500px] h-auto"
            />
          </motion.h1>

          {/* Tagline */}
          <motion.p
            variants={item}
            initial="hidden"
            animate="show"
            className="mb-4 max-w-3xl mx-auto text-lg sm:text-xl lg:text-2xl text-white/80"
          >
            Where Talent Unites. Where Legends Rise
          </motion.p>

          {/* Event Details */}
          <motion.div
            variants={item}
            initial="hidden"
            animate="show"
            className="mb-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-white/70"
          >
            <div className="flex items-center">
              <CalendarDays className="mr-2 h-5 w-5 text-yellow-400" />
              <span className="font-medium">March 27-28, 2026</span>
            </div>

            <div className="hidden sm:block text-white/40">•</div>

            <div className="flex items-center">
              <MapPin className="mr-2 h-5 w-5 text-yellow-400" />
              <span className="font-medium">
                Vemana Institute of Technology, Bangalore
              </span>
            </div>
          </motion.div>

          {/* Buttons */}
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="/passes">
              <ShinyButton variant="purple">
                🎟️ Get Your Passes
              </ShinyButton>
            </Link>

            <Link href="/events">
              <ShinyButton>
                📜 Explore Events
              </ShinyButton>
            </Link>

            {/* 🔥 Custom Gold Register Button */}
            <Link href="/events">
              <ShinyButton className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black shadow-[0_0_25px_rgba(255,200,0,0.5)] hover:scale-105 transition">
                🔗 Register Now
              </ShinyButton>
            </Link>
          </div>

          {/* Countdown (Outside buttons now) */}
          <div className="mt-8">
            <ShiftingCountdown />
          </div>

        </div>
      </div>
    </section>
  );
}
