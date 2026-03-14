"use client";

import { motion } from "framer-motion";

export default function PrizePoolBanner() {
  return (
    <div className="relative flex justify-center items-center py-10 px-4 overflow-hidden bg-transparent/50">
      {/* Ambient glow bg */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] rounded-full bg-yellow-400/10 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-3xl"
      >
        <div className="relative rounded-2xl border border-yellow-400/30 bg-gradient-to-r from-yellow-500/10 via-amber-400/15 to-yellow-500/10 backdrop-blur-md overflow-hidden shadow-[0_0_40px_rgba(234,179,8,0.2)]">
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/5 to-transparent animate-pulse pointer-events-none" />

          <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 px-8 py-6 text-center">
            {/* Left trophy */}
            <motion.span
              animate={{ rotate: [-5, 5, -5] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="text-5xl hidden sm:block"
            >
              🏆
            </motion.span>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-yellow-400/70 mb-1">
                Overall Prize Pool
              </p>
              <p className="text-5xl md:text-6xl font-black leading-none">
                <span className="bg-gradient-to-r from-yellow-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent [text-shadow:0_0_40px_rgba(234,179,8,0.4)]">
                  ₹1,00,000
                </span>
              </p>
              <p className="text-sm text-yellow-300/60 mt-2 font-medium">
                Worth of prizes across 24 exciting events
              </p>
            </div>

            {/* Right trophy */}
            <motion.span
              animate={{ rotate: [5, -5, 5] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="text-5xl hidden sm:block"
            >
              🏆
            </motion.span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
