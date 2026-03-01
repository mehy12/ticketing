"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { SplashScreen } from "@/components/splash-screen";
import { CustomCursor } from "@/components/custom-cursor";
import { HeroSection } from "./components/hero-section";
import { FeaturedGames } from "./components/featured-games";
import { ParallaxSection } from "./components/parallax-section";
import { LiquidGlassCard } from "@/components/liquid-glass";

export default function Home() {
  const containerRef = useRef(null);

  return (
    <>
      <SplashScreen />
      <CustomCursor />

      <div ref={containerRef} className="relative min-h-screen bg-black">
        {/* Hero Section with enhanced parallax */}
        <HeroSection />

        {/* Featured Games Section */}
        <FeaturedGames />

        {/* Upcoming Tournaments Section */}
        {/* <ParallaxSection className="py-20 px-6 bg-black/50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Upcoming Tournaments
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Register now for these upcoming events and compete for glory and
                prizes
              </p>
            </motion.div>
          </div>
        </ParallaxSection> */}

        {/* Sponsors Section */}
        <ParallaxSection className="py-20 px-6 bg-black">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Our Sponsors
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Partnering with industry leaders to bring you the best esports
                experience
              </p>
            </motion.div>
          </div>
        </ParallaxSection>

        {/* FAQ Section */}
        <ParallaxSection className="py-20 px-6 bg-black/50">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-400">
                Everything you need to know about the tournament
              </p>
            </motion.div>

            <div className="space-y-4">
              {[
                {
                  question: "How do I register my team?",
                  answer:
                    "Registration is simple! Click on the 'Register Team' button and fill out the form with your team details. Make sure all team members have valid college IDs.",
                },
                {
                  question: "What are the hardware requirements?",
                  answer:
                    "For Valorant, you'll need a computer that meets the minimum game requirements. For BGMI, you'll need a compatible mobile device. All peripherals will be provided at the venue.",
                },
                {
                  question: "Is there an entry fee?",
                  answer:
                    "Yes, there is a nominal entry fee of ₹500 per team to ensure commitment and help with prize pool funding.",
                },
                {
                  question: "Can I participate in multiple tournaments?",
                  answer:
                    "You can register for both Valorant and BGMI tournaments, but please ensure there are no schedule conflicts.",
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="overflow-hidden"
                >
                  <LiquidGlassCard draggable={false} borderRadius="12px" blurIntensity="lg" shadowIntensity="sm" glowIntensity="xs" className="p-4 md:p-6">
                    <h3 className="text-lg font-medium text-white mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-gray-400">{faq.answer}</p>
                  </LiquidGlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </ParallaxSection>

        {/* CTA Section */}
        <ParallaxSection className="py-20 px-6 bg-black">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF4655]/20 to-[#1F85DE]/20 blur-3xl opacity-50" />
              <LiquidGlassCard draggable={false} borderRadius="12px" blurIntensity="lg" shadowIntensity="md" glowIntensity="sm" className="relative p-8 md:p-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to Compete?
                </h2>
                <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                  Join the ultimate college esports championship and showcase
                  your skills on the biggest stage. Limited slots available!
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#FF4655] text-white px-8 py-4 rounded-sm text-lg font-medium hover:bg-[#FF4655]/90 transition-colors"
                >
                  Register Now
                </motion.button>
              </LiquidGlassCard>
            </motion.div>
          </div>
        </ParallaxSection>
      </div>
      <CustomCursor />
    </>
  );
}
