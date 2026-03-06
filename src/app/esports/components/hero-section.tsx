"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ChevronDown, Calendar, Trophy, Users, MapPin, Zap } from "lucide-react";
import Link from "next/link";
import { ParticlesBackground } from "./particles";

/* ─── Countdown ─── */
function Countdown({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [prevTimeLeft, setPrevTimeLeft] = useState(timeLeft);

  useEffect(() => {
    const calc = () => {
      const diff = +targetDate - +new Date();
      if (diff > 0) {
        const next = {
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        };
        setPrevTimeLeft(timeLeft);
        setTimeLeft(next);
      }
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const units = [
    { label: "DAYS", value: timeLeft.days },
    { label: "HRS", value: timeLeft.hours },
    { label: "MIN", value: timeLeft.minutes },
    { label: "SEC", value: timeLeft.seconds },
  ];

  return (
    <div className="flex gap-3 md:gap-5">
      {units.map(({ label, value }, i) => (
        <div key={label} className="text-center group">
          <div className="relative">
            {/* Neon glow behind */}
            <div className="absolute -inset-1 bg-[#FF4655]/30 blur-xl rounded-lg opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -inset-0.5 bg-gradient-to-b from-[#FF4655]/40 to-[#FF4655]/10 rounded-lg" />
            <div className="relative bg-black/80 backdrop-blur-md border border-[#FF4655]/40 rounded-lg px-4 py-3 md:px-6 md:py-4 overflow-hidden">
              {/* Scan line inside */}
              <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,70,85,0.03)_2px,rgba(255,70,85,0.03)_4px)] pointer-events-none" />
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={value}
                  initial={{ y: -20, opacity: 0, scale: 0.8 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: 20, opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="block text-3xl md:text-5xl font-black text-white tabular-nums"
                  style={{ textShadow: "0 0 20px rgba(255,70,85,0.6), 0 0 40px rgba(255,70,85,0.3)" }}
                >
                  {String(value).padStart(2, "0")}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
          <span className="text-[10px] md:text-xs text-[#FF4655]/80 mt-2 block font-bold tracking-[0.2em]">
            {label}
          </span>
          {/* Separator colon */}
          {i < 3 && (
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="absolute -right-2 top-1/2 -translate-y-1/2 text-[#FF4655] text-2xl md:text-3xl font-bold hidden md:block"
            >
            </motion.span>
          )}
        </div>
      ))}
    </div>
  );
}

/* ─── Glitch Text ─── */
function GlitchText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`relative inline-block ${className}`}>
      {/* Glitch layers */}
      <span
        className="absolute top-0 left-0 w-full h-full animate-glitch-1 text-[#FF4655] opacity-70"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 33%, 0 33%)" }}
        aria-hidden
      >
        {children}
      </span>
      <span
        className="absolute top-0 left-0 w-full h-full animate-glitch-2 text-[#1F85DE] opacity-70"
        style={{ clipPath: "polygon(0 67%, 100% 67%, 100% 100%, 0 100%)" }}
        aria-hidden
      >
        {children}
      </span>
      {/* Main text */}
      <span className="relative">{children}</span>
    </span>
  );
}

/* ─── Stat Card ─── */
function StatCard({ icon: Icon, title, subtitle, delay }: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.05, y: -4 }}
      className="relative group cursor-default"
    >
      {/* Neon border glow */}
      <div className="absolute -inset-[1px] bg-gradient-to-r from-[#FF4655]/50 via-transparent to-[#1F85DE]/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
      <div className="absolute -inset-[1px] bg-gradient-to-r from-[#FF4655]/30 via-transparent to-[#1F85DE]/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative bg-black/60 backdrop-blur-md border border-white/10 group-hover:border-[#FF4655]/40 p-5 rounded-lg transition-all duration-500 overflow-hidden">
        {/* Scan line */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.01)_2px,rgba(255,255,255,0.01)_4px)] pointer-events-none" />
        {/* Glow spot */}
        <div className="absolute -top-8 -right-8 w-20 h-20 bg-[#FF4655]/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <Icon className="text-[#FF4655] mb-3 w-5 h-5 group-hover:drop-shadow-[0_0_8px_rgba(255,70,85,0.8)] transition-all duration-300" />
        <h3 className="text-white text-base font-bold mb-1">{title}</h3>
        <p className="text-gray-500 text-sm">{subtitle}</p>
      </div>
    </motion.div>
  );
}

/* ─── Scan Lines Overlay ─── */
function ScanLines() {
  return (
    <div className="absolute inset-0 z-[5] pointer-events-none overflow-hidden">
      {/* Horizontal scan lines */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)",
        }}
      />
      {/* Moving scan line */}
      <motion.div
        animate={{ y: ["-100%", "200%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF4655]/30 to-transparent"
      />
      {/* Secondary scan */}
      <motion.div
        animate={{ y: ["200%", "-100%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear", delay: 3 }}
        className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#1F85DE]/20 to-transparent"
      />
    </div>
  );
}

/* ─── Hero Section ─── */
export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const subtitleY = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const floatingAnimation = {
    y: ["-12px", "12px", "-12px"],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" as const },
  };

  return (
    <div ref={containerRef} className="relative min-h-[150vh] overflow-hidden">
      {/* BG layers */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black bg-cover bg-[url('/esports/esports-bg.avif')] bg-no-repeat bg-center -z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,70,85,0.12),transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(31,133,222,0.08),transparent_50%)]" />
        <ParticlesBackground />
      </motion.div>

      {/* Scan lines */}
      <ScanLines />

      {/* Decorative glows */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        <motion.div
          animate={floatingAnimation}
          className="absolute top-[15%] right-[8%] w-72 h-72 rounded-full bg-[#FF4655]/8 blur-[120px]"
        />
        <motion.div
          animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 1.5 } }}
          className="absolute bottom-[25%] left-[3%] w-96 h-96 rounded-full bg-[#1F85DE]/8 blur-[140px]"
        />
        <motion.div
          animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 3 } }}
          className="absolute top-[60%] right-[30%] w-48 h-48 rounded-full bg-[#FF4655]/5 blur-[100px]"
        />

        {/* Vertical neon lines */}
        {[
          { left: "18%", height: 350, color: "#FF4655", delay: 0, opacity: 0.4 },
          { left: "20%", height: 220, color: "#FF4655", delay: 0.3, opacity: 0.25 },
          { left: "78%", height: 300, color: "#1F85DE", delay: 0.5, opacity: 0.35 },
          { left: "82%", height: 180, color: "#1F85DE", delay: 0.7, opacity: 0.2 },
        ].map((line, i) => (
          <motion.div
            key={i}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: line.height, opacity: line.opacity }}
            transition={{ duration: 2, delay: line.delay, ease: "easeOut" }}
            className="absolute top-[8%] w-[1px]"
            style={{
              left: line.left,
              background: `linear-gradient(to bottom, transparent, ${line.color}, transparent)`,
              boxShadow: `0 0 8px ${line.color}40`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 pt-32 pb-20 px-6 min-h-screen flex flex-col justify-center">
        <div className="max-w-7xl mx-auto w-full">

          {/* Title */}
          <motion.div style={{ y: titleY, opacity }} className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-block"
            >
              <span className="inline-flex items-center gap-2 px-5 py-1.5 mb-5 text-sm font-medium bg-[#FF4655]/10 text-[#FF4655] border border-[#FF4655]/30 rounded-sm backdrop-blur-sm"
                style={{ boxShadow: "0 0 20px rgba(255,70,85,0.15), inset 0 0 20px rgba(255,70,85,0.05)" }}
              >
                <Zap className="w-3.5 h-3.5" />
                MARCH 27-28, 2026
                <Zap className="w-3.5 h-3.5" />
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-7xl md:text-9xl font-black mb-4 font-[family-name:var(--font-anton)] leading-none"
            >
              <GlitchText className="inline-block transform -skew-x-6">
                <span className="text-[#FF4655]" style={{ textShadow: "0 0 30px rgba(255,70,85,0.5), 0 0 60px rgba(255,70,85,0.2)" }}>
                  LAST
                </span>
              </GlitchText>
              <GlitchText className="inline-block transform skew-x-6">
                <span className="text-white" style={{ textShadow: "0 0 20px rgba(255,255,255,0.3)" }}>
                  ROUND
                </span>
              </GlitchText>
              <span className="block mt-1">
                <GlitchText className="inline-block">
                  <span className="text-white" style={{ textShadow: "0 0 20px rgba(255,255,255,0.2)" }}>
                    20
                  </span>
                </GlitchText>
                <GlitchText className="inline-block">
                  <span className="text-[#FF4655]" style={{ textShadow: "0 0 30px rgba(255,70,85,0.5), 0 0 60px rgba(255,70,85,0.2)" }}>
                    26
                  </span>
                </GlitchText>
              </span>
            </motion.h1>
          </motion.div>

          {/* Subtitle */}
          <motion.div style={{ y: subtitleY, opacity }} className="text-center mb-12">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-xl md:text-2xl text-gray-300 mb-2 font-bold font-[family-name:var(--font-anton)] tracking-[0.15em]"
            >
              INTER COLLEGE ESPORTS CHAMPIONSHIP
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-sm md:text-base text-gray-500 tracking-[0.3em] font-light"
            >
              COMPETE &bull; CONQUER &bull; CLAIM GLORY
            </motion.p>
          </motion.div>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex justify-center mb-14"
          >
            <Countdown targetDate={new Date("2026-03-27T10:00:00")} />
          </motion.div>

          {/* Stat cards */}
          <motion.div
            style={{ y: contentY, opacity }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 max-w-4xl mx-auto mb-14"
          >
            <StatCard icon={Calendar} title="March 27-28th" subtitle="Two days of intense competition" delay={1.0} />
            <StatCard icon={Trophy} title="₹50,000 Prize Pool" subtitle="Top teams share the spoils" delay={1.1} />
            <StatCard icon={Users} title="32 Teams" subtitle="Limited slots available" delay={1.2} />
            <StatCard icon={MapPin} title="Main Auditorium" subtitle="Central campus location" delay={1.3} />
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/" className="relative group inline-flex items-center justify-center">
              {/* Pulsing glow */}
              <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-[#FF4655]/40 blur-xl rounded-sm"
              />
              <span className="relative bg-[#FF4655] text-white px-8 py-4 text-sm font-bold tracking-[0.15em] rounded-sm hover:bg-[#FF4655]/90 transition-all duration-300 flex items-center gap-2 border border-[#FF4655]/60"
                style={{ boxShadow: "0 0 20px rgba(255,70,85,0.3), inset 0 1px 0 rgba(255,255,255,0.1)" }}
              >
                EXPLORE MORE
                <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.3em] text-gray-600 uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-[#FF4655]/70" style={{ filter: "drop-shadow(0 0 4px rgba(255,70,85,0.5))" }} />
        </motion.div>
      </motion.div>
    </div>
  );
}
