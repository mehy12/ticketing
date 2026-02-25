"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import Link from "next/link";
import { Button } from "./ui/button";

const AboutSection = () => {
  const handleLearnMore = () => {
    console.log("Learn More clicked!");
  };

  return (
    <section className="relative bg-gradient-to-b from-transparent/50 to-transparent/30 text-white py-16 px-6 overflow-hidden">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Main Title */}
          <motion.h2
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-6xl  font-extrabold text-[#D4AF37] mb-6 drop-shadow-lg"
          >
            About Ikyam 2026 🎭
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-xl text-[#FDF6E3] leading-relaxed tracking-wide font-light"
          >
            Celebrating{" "}
            <span className="text-[#FFD700] font-semibold">25 Years</span> of
            culture, creativity, and passion,{" "}
            <span className="text-[#E5C100] font-semibold">Ikyam 2026</span> is
            a one-of-a-kind cultural extravaganza at{" "}
            <span className="text-[#FAE9B4] font-medium">
              Vemana Institute of Technology, Bangalore
            </span>
            . Featuring{" "}
            <span className="text-[#FFE4B5] font-bold">
              electrifying performances
            </span>
            ,{" "}
            <span className="text-[#FFD700] font-bold">
              thrilling competitions
            </span>
            , and an exclusive{" "}
            <span className="text-[#F5DEB3] font-bold">
              collaboration with Bigg Boss Kannada
            </span>
            , this year’s festival is set to be an unforgettable experience!
          </motion.p>

          {/* Learn More Button */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mt-8"
          >
            <Link href="/about">
              <Button
                variant="default"
                className="bg-[#FFD700] text-black hover:bg-[#E5C100]"
                onClick={handleLearnMore}
              >
                Learn More
              </Button>
            </Link>
          </motion.div>

          {/* Additional Content Below */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-12"
          >
            <h3 className="text-4xl font-bold text-[#E5C100] mb-6 drop-shadow-md">
              What to Expect at Vemanotsav 2026? 🚀
            </h3>

            <ul className="text-lg text-[#FDF6E3] space-y-4 font-light">
              <li>
                🎤{" "}
                <span className="text-[#FFD700] font-semibold">
                  Electrifying Performances
                </span>{" "}
                - Solo & group dance (Indian & Western), singing, rap, beatboxing,
                stand-up comedy, poetry, fashion show, and more.
              </li>

              <li>
                🏆{" "}
                <span className="text-[#E5C100] font-semibold">
                  Exciting Competitions
                </span>{" "}
                - Quiz, Shark Tank, creative writing, air crash, short film,
                reel making, and interactive challenge events.
              </li>

              <li>
                🎮{" "}
                <span className="text-[#FAE9B4] font-semibold">
                  Esports & Gaming Arena
                </span>{" "}
                - BGMI, Call of Duty Mobile, Free Fire, and Minecraft team battles
                conducted in custom rooms with fair-play rules.
              </li>

              <li>
                🎨{" "}
                <span className="text-[#F5DEB3] font-semibold">
                  Arts & Creativity
                </span>{" "}
                - Canvas painting, photography, drama-style performances,
                and cultural showcases.
              </li>

              <li>
                🎉{" "}
                <span className="text-[#FFE4A3] font-semibold">
                  Festive Campus Vibes
                </span>{" "}
                - Inter-college participation, networking, unity in diversity,
                music, food, and unforgettable memories.
              </li>
            </ul>

            {/* Call-to-Action Button */}
            <div className="mt-8">
              <Link href="https://linktr.ee/Ikyam.vemanothsav">
                <Button
                  variant="secondary"
                  className="bg-[#E5C100] text-black hover:bg-[#C4A000]"
                >
                  Register Now
                </Button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default AboutSection;
