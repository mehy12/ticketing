"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Calendar, Trophy, Users, MapPin } from "lucide-react";
import Link from "next/link";
import { ParticlesBackground } from "./particles";

interface CountdownProps {
  targetDate: Date;
}

function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex gap-4 md:gap-6">
      {Object.entries(timeLeft).map(([label, value]) => (
        <div key={label} className="text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-[#FF4655]/20 blur-md rounded-md"></div>
            <div className="relative bg-black/50 backdrop-blur-sm border border-[#FF4655]/30 rounded-md px-3 py-2 md:px-5 md:py-3">
              <span className="text-2xl md:text-4xl font-bold text-white">
                {value}
              </span>
            </div>
          </div>
          <span className="text-xs md:text-sm text-gray-400 mt-1 block capitalize">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax effects for different elements
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const subtitleY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Floating animation variants
  const floatingAnimation = {
    y: ["-10px", "10px", "-10px"],
    transition: {
      duration: 6,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  };

  return (
    <div ref={containerRef} className="relative min-h-[150vh] overflow-hidden">
      {/* Background layers with parallax */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black bg-cover bg-[url('/esports/esports-bg.avif')] bg-no-repeat  -z-10"></div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent/50 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,70,85,0.15),transparent_70%)]" />

        {/* Animated particles */}
        <ParticlesBackground />
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute inset-0 z-1 overflow-hidden pointer-events-none">
        <motion.div
          animate={floatingAnimation}
          className="absolute top-[20%] right-[10%] w-64 h-64 rounded-full bg-[#FF4655]/10 blur-[100px]"
        />
        <motion.div
          animate={{
            ...floatingAnimation,
            transition: {
              ...floatingAnimation.transition,
              delay: 1,
            },
          }}
          className="absolute bottom-[30%] left-[5%] w-80 h-80 rounded-full bg-[#1F85DE]/10 blur-[120px]"
        />

        {/* Glowing lines */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 300, opacity: 0.6 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute top-[10%] left-[20%] w-[1px] bg-gradient-to-b from-transparent via-[#FF4655] to-transparent"
        />
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 200, opacity: 0.4 }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          className="absolute top-[15%] left-[22%] w-[1px] bg-gradient-to-b from-transparent via-[#FF4655] to-transparent"
        />
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 250, opacity: 0.5 }}
          transition={{ duration: 1.8, delay: 0.3, ease: "easeOut" }}
          className="absolute top-[12%] right-[25%] w-[1px] bg-gradient-to-b from-transparent via-[#1F85DE] to-transparent"
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 pt-32 pb-20 px-6 min-h-screen flex flex-col justify-center">
        <div className="max-w-7xl mx-auto w-full">
          {/* Title and subtitle with parallax */}
          <motion.div
            style={{ y: titleY, opacity }}
            className="text-center mb-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-block"
            >
              <span className="inline-block px-4 py-1 mb-4 text-sm font-medium bg-[#FF4655]/20 text-[#FF4655] rounded-sm border border-[#FF4655]/30">
                MARCH 27-28, 2026
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-8xl font-black mb-4 font-[family-name:var(--font-anton)] text-shadow-lg"
            >
              <span className="inline-block transform -skew-x-12 text-[#FF4655] text-shadow-md">
                LAS
              </span>
              <span className="inline-block transform text-red-200 text-shadow-md">
                TRO
              </span>
              <span className="inline-block transform skew-x-12 text-white text-shadow-md">
                UND
              </span>
              <span className="block mt-2 text-white text-shadow-md">
                <span className="inline-block transform -skew-x-12">20</span>
                <span className="inline-block transform skew-x-12 text-[#FF4655] text-shadow-md">
                  26
                </span>
              </span>
            </motion.h1>
          </motion.div>

          <motion.div
            style={{ y: subtitleY, opacity }}
            className="text-center mb-12"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-300 mb-2 font-bold font-[family-name:var(--font-anton)]"
            >
              INTER COLLEGE ESPORTS CHAMPIONSHIP
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-base text-gray-400"
            >
              COMPETE • CONQUER • CLAIM GLORY
            </motion.p>
          </motion.div>

          {/* Countdown timer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex justify-center mb-12"
          >
            <Countdown targetDate={new Date("2026-04-04T10:00:00")} />
          </motion.div>

          {/* Event details with parallax */}
          <motion.div
            style={{ y: contentY, opacity }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="bg-black/30 backdrop-blur-sm border border-white/10 p-4 rounded-sm group hover:border-[#FF4655]/30 transition-all duration-300"
            >
              <Calendar className="text-[#FF4655] mb-3 w-5 h-5 group-hover:scale-110 transition-transform" />
              <h3 className="text-white text-base font-bold mb-1">
                March 27-28th
              </h3>
              <p className="text-gray-400 text-sm">
                Two days of intense competition
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              className="bg-black/30 backdrop-blur-sm border border-white/10 p-4 rounded-sm group hover:border-[#FF4655]/30 transition-all duration-300"
            >
              <Trophy className="text-[#FF4655] mb-3 w-5 h-5 group-hover:scale-110 transition-transform" />
              <h3 className="text-white text-base font-bold mb-1">
                ₹50,000 Prize Pool
              </h3>
              <p className="text-gray-400 text-sm">
                Top teams share the prize pool
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="bg-black/30 backdrop-blur-sm border border-white/10 p-4 rounded-sm group hover:border-[#FF4655]/30 transition-all duration-300"
            >
              <Users className="text-[#FF4655] mb-3 w-5 h-5 group-hover:scale-110 transition-transform" />
              <h3 className="text-white text-base font-bold mb-1">32 Teams</h3>
              <p className="text-gray-400 text-sm">Limited slots available</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.3 }}
              className="bg-black/30 backdrop-blur-sm border border-white/10 p-4 rounded-sm group hover:border-[#FF4655]/30 transition-all duration-300"
            >
              <MapPin className="text-[#FF4655] mb-3 w-5 h-5 group-hover:scale-110 transition-transform" />
              <h3 className="text-white text-base font-bold mb-1">
                Main Auditorium
              </h3>
              <p className="text-gray-400 text-sm">Central campus location</p>
            </motion.div>
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/"
              className=" bg-[#FF4655] text-white 
                       px-6 py-3 md:px-8 md:py-4 text-sm tracking-wider rounded-sm hover:bg-[#FF4655]/90 
                       transition-all duration-300 group flex items-center justify-center"
            >
              EXPLORE MORE
              <ChevronDown className="ml-2 w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <ChevronDown className="w-6 h-6 text-[#FF4655]" />
        </motion.div>
      </motion.div>
    </div>
  );
}
