"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { SplashScreen } from "@/components/splash-screen";
import { CustomCursor } from "@/components/custom-cursor";
import { HeroSection } from "./components/hero-section";
import { FeaturedGames } from "./components/featured-games";
import { ParallaxSection } from "./components/parallax-section";
import { LiquidGlassCard } from "@/components/liquid-glass";
import { Trophy, ChevronDown, Zap } from "lucide-react";
import Link from "next/link";

/* ─── Animated Counter ─── */
function AnimatedCounter({ target, prefix = "", suffix = "" }: { target: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const stepTime = 16;
    const steps = duration / stepTime;
    const increment = target / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

/* ─── FAQ Accordion ─── */
function FAQItem({ question, answer, index, isOpen, toggle }: {
  question: string; answer: string; index: number; isOpen: boolean; toggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <div
        className={`relative overflow-hidden rounded-lg border transition-all duration-500 ${
          isOpen
            ? "border-[#FF4655]/30 bg-[#FF4655]/5"
            : "border-white/5 bg-white/[0.02] hover:border-white/10"
        }`}
      >
        {/* Glow on open */}
        {isOpen && (
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#FF4655]/10 blur-3xl pointer-events-none" />
        )}

        <button
          onClick={toggle}
          className="relative z-10 w-full flex items-center justify-between p-5 md:p-6 text-left"
        >
          <span className="flex items-center gap-3">
            <span
              className={`flex items-center justify-center w-7 h-7 rounded-sm text-xs font-bold transition-colors duration-300 ${
                isOpen ? "bg-[#FF4655] text-white" : "bg-white/5 text-gray-500"
              }`}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className={`text-base md:text-lg font-medium transition-colors duration-300 ${isOpen ? "text-white" : "text-gray-300"}`}>
              {question}
            </span>
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <ChevronDown className={`w-5 h-5 transition-colors duration-300 ${isOpen ? "text-[#FF4655]" : "text-gray-600"}`} />
          </motion.div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-5 md:px-6 md:pb-6 pl-[60px] md:pl-[68px]">
                <p className="text-gray-400 text-sm md:text-base leading-relaxed">{answer}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ─── Main Page ─── */
export default function Home() {
  const containerRef = useRef(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "How do I register my team?",
      answer: "Registration is simple! Click on the 'Register Team' button and fill out the form with your team details. Make sure all team members have valid college IDs.",
    },
    {
      question: "What are the hardware requirements?",
      answer: "For Valorant, you'll need a computer that meets the minimum game requirements. For BGMI, you'll need a compatible mobile device. All peripherals will be provided at the venue.",
    },
    {
      question: "Is there an entry fee?",
      answer: "Yes, there is a nominal entry fee of ₹500 per team to ensure commitment and help with prize pool funding.",
    },
    {
      question: "Can I participate in multiple tournaments?",
      answer: "You can register for both Valorant and BGMI tournaments, but please ensure there are no schedule conflicts.",
    },
  ];

  const prizeStats = [
    { label: "Total Prize Pool", value: 50000, prefix: "₹", color: "#FFD700" },
    { label: "Competing Teams", value: 32, prefix: "", color: "#FF4655" },
    { label: "Games Featured", value: 4, prefix: "", color: "#1F85DE" },
    { label: "Days of Action", value: 2, prefix: "", color: "#4CAF50" },
  ];

  return (
    <>
      <SplashScreen />
      <CustomCursor />

      <div ref={containerRef} className="relative min-h-screen bg-black">
        <HeroSection />
        <FeaturedGames />

        {/* ─── Prize Pool Section ─── */}
        <ParallaxSection className="py-24 px-6 bg-black relative overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FFD700]/5 rounded-full blur-[150px]" />
            <div className="absolute inset-0 opacity-[0.015]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='52' viewBox='0 0 60 52' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 15v22L30 52 0 37V15z' fill='none' stroke='white' stroke-width='0.5'/%3E%3C/svg%3E")`,
                backgroundSize: "60px 52px",
              }}
            />
          </div>

          <div className="max-w-5xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-16"
            >
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 60 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="h-[2px] bg-[#FFD700] mx-auto mb-6"
              />
              <h2 className="text-3xl md:text-5xl font-black mb-4">
                <span className="text-white">PRIZE </span>
                <span className="text-[#FFD700]" style={{ textShadow: "0 0 20px rgba(255,215,0,0.3)" }}>POOL</span>
              </h2>
              <p className="text-gray-500 max-w-lg mx-auto">
                Compete for glory and take home your share of the prize pool
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {prizeStats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="relative group"
                >
                  <div
                    className="absolute -inset-[1px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{ background: `linear-gradient(135deg, ${stat.color}40, transparent 50%, ${stat.color}40)` }}
                  />
                  <div className="relative bg-white/[0.03] border border-white/5 group-hover:border-transparent rounded-xl p-6 text-center transition-all duration-500 overflow-hidden">
                    <div
                      className="absolute -top-8 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-700"
                      style={{ backgroundColor: stat.color }}
                    />
                    <p
                      className="text-3xl md:text-4xl font-black mb-2 relative"
                      style={{ color: stat.color, textShadow: `0 0 20px ${stat.color}40` }}
                    >
                      <AnimatedCounter target={stat.value} prefix={stat.prefix} />
                    </p>
                    <p className="text-gray-500 text-xs md:text-sm font-medium tracking-wider uppercase">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </ParallaxSection>

        {/* ─── Sponsors Section ─── */}
        <ParallaxSection className="py-20 px-6 bg-black/50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-12"
            >
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 60 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="h-[2px] bg-[#FF4655] mx-auto mb-6"
              />
              <h2 className="text-3xl md:text-4xl font-black mb-4">
                <span className="text-white">OUR </span>
                <span className="text-[#FF4655]">SPONSORS</span>
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Partnering with industry leaders to bring you the best esports experience
              </p>
            </motion.div>
          </div>
        </ParallaxSection>

        {/* ─── FAQ Section ─── */}
        <ParallaxSection className="py-24 px-6 bg-black relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF4655]/5 rounded-full blur-[150px]" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#1F85DE]/5 rounded-full blur-[150px]" />
          </div>

          <div className="max-w-3xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-12"
            >
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 60 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="h-[2px] bg-[#FF4655] mx-auto mb-6"
              />
              <h2 className="text-3xl md:text-5xl font-black mb-4">
                <span className="text-white">FREQUENTLY </span>
                <span className="text-[#FF4655]">ASKED</span>
              </h2>
              <p className="text-gray-500">
                Everything you need to know about the tournament
              </p>
            </motion.div>

            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  index={index}
                  isOpen={openFaq === index}
                  toggle={() => setOpenFaq(openFaq === index ? null : index)}
                />
              ))}
            </div>
          </div>
        </ParallaxSection>

        {/* ─── CTA Section ─── */}
        <ParallaxSection className="py-24 px-6 bg-black relative overflow-hidden">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative"
            >
              {/* Background glows */}
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-gradient-to-r from-[#FF4655]/15 to-[#1F85DE]/15 blur-[100px] rounded-full" />

              <div className="relative bg-white/[0.02] border border-white/5 rounded-2xl p-10 md:p-16 overflow-hidden group">
                {/* Animated border gradient */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,70,85,0.1), transparent 40%, transparent 60%, rgba(31,133,222,0.1))",
                  }}
                />
                {/* Scan lines */}
                <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.008)_2px,rgba(255,255,255,0.008)_4px)] pointer-events-none" />

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <Zap className="w-10 h-10 text-[#FF4655] mx-auto mb-6" style={{ filter: "drop-shadow(0 0 12px rgba(255,70,85,0.5))" }} />
                </motion.div>

                <h2 className="text-3xl md:text-5xl font-black mb-4 text-white">
                  Ready to <span className="text-[#FF4655]" style={{ textShadow: "0 0 20px rgba(255,70,85,0.3)" }}>Compete</span>?
                </h2>
                <p className="text-gray-400 mb-10 max-w-2xl mx-auto text-sm md:text-base">
                  Join the ultimate college esports championship and showcase your skills on the biggest stage. Limited slots available!
                </p>

                <Link href="/register" className="relative group/btn inline-flex items-center justify-center">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-[#FF4655]/30 blur-2xl rounded-sm"
                  />
                  <span
                    className="relative bg-[#FF4655] text-white px-10 py-4 rounded-sm text-sm font-bold tracking-[0.15em] hover:bg-[#FF4655]/90 transition-all duration-300 border border-[#FF4655]/60"
                    style={{ boxShadow: "0 0 25px rgba(255,70,85,0.3), inset 0 1px 0 rgba(255,255,255,0.1)" }}
                  >
                    REGISTER NOW
                  </span>
                </Link>
              </div>
            </motion.div>
          </div>
        </ParallaxSection>
      </div>
      <CustomCursor />
    </>
  );
}
