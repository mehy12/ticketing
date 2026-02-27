"use client";
import ShiftingCountdown from "./countdown";
import { motion } from "framer-motion";
import FancyButton from "./ui/fancy-button";
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
      <div className="container mx-auto px-6 pt-4 md:pt-12 flex min-h-screen items-center justify-center text-white">
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
              width={800}
              height={400}
              priority
              className="w-[340px] sm:w-[450px] md:w-[400px] lg:w-[500px] xl:w-[700px] h-auto"
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
              width={4000}
              height={4000}
              className="w-[260px] sm:w-[360px] md:w-[330px] lg:w-[400px] h-auto"
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

            <Link href="/events">
              <FancyButton variant="secondary" color="cyan">
                📜 Explore Events
              </FancyButton>
            </Link>

            <Link href="/register">
              <FancyButton variant="expand" color="gold">
                Register Now
              </FancyButton>
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
