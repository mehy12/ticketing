"use client";

import React from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { ShaderAnimation } from "@/components/ui/shader-animation";
import { ShaderLines } from "@/components/ui/shader-lines";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { CanvasText } from "@/components/ui/canvas-text";
import FancyButton from "@/components/ui/fancy-button";
import { Spotlight, SpotLightItem } from "@/components/spotlight";
import {
  Crown,
  Star,
  Gem,
  Globe,
  Cpu,
  Rocket,
  Zap,
  Shield,
  Layers,
} from "lucide-react";

/* ─── Types ─── */
interface Sponsor {
  name: string;
  tagline: string;
  icon: React.ReactNode;
  tier: "platinum" | "gold" | "silver";
  website?: string;
}

/* ─── Dummy Data ─── */
const SPONSORS: Sponsor[] = [
  // Platinum
  {
    name: "NovaTech Industries",
    tagline: "Pioneering the future of innovation",
    icon: <Rocket className="w-10 h-10" />,
    tier: "platinum",
    website: "#",
  },
  // Gold
  {
    name: "Quantum Labs",
    tagline: "Where science meets imagination",
    icon: <Cpu className="w-8 h-8" />,
    tier: "gold",
    website: "#",
  },
  {
    name: "Apex Digital",
    tagline: "Crafting digital excellence",
    icon: <Globe className="w-8 h-8" />,
    tier: "gold",
    website: "#",
  },
  {
    name: "VoltEdge Energy",
    tagline: "Powering tomorrow, today",
    icon: <Zap className="w-8 h-8" />,
    tier: "gold",
    website: "#",
  },
  // Silver
  {
    name: "SentinelX Security",
    tagline: "Safeguarding digital frontiers",
    icon: <Shield className="w-7 h-7" />,
    tier: "silver",
    website: "#",
  },
  {
    name: "StackFlow Systems",
    tagline: "Building scalable solutions",
    icon: <Layers className="w-7 h-7" />,
    tier: "silver",
    website: "#",
  },
  {
    name: "CrystalByte Media",
    tagline: "Stories that resonate",
    icon: <Gem className="w-7 h-7" />,
    tier: "silver",
    website: "#",
  },
  {
    name: "StarForge Studios",
    tagline: "Designing unforgettable experiences",
    icon: <Star className="w-7 h-7" />,
    tier: "silver",
    website: "#",
  },
];

/* ─── Tier Config ─── */
const TIER_CONFIG = {
  platinum: {
    label: "Platinum Sponsor",
    gradient: "from-amber-300 via-yellow-200 to-amber-400",
    border: "border-amber-400/40",
    animatedBorder: "animate-border-platinum",
    glow: "from-amber-400 via-yellow-300 to-amber-500",
    text: "text-amber-200",
    badgeBg: "bg-amber-500/20",
    badgeBorder: "border-amber-400/30",
    iconColor: "text-amber-300",
    shaderOpacity: "opacity-30 group-hover:opacity-50",
  },
  gold: {
    label: "Gold Sponsor",
    gradient: "from-yellow-400 via-amber-300 to-yellow-500",
    border: "border-yellow-400/30",
    animatedBorder: "animate-border-gold",
    glow: "from-yellow-400 via-amber-300 to-yellow-500",
    text: "text-yellow-200",
    badgeBg: "bg-yellow-500/15",
    badgeBorder: "border-yellow-400/25",
    iconColor: "text-yellow-300",
    shaderOpacity: "opacity-20 group-hover:opacity-40",
  },
  silver: {
    label: "Silver Sponsor",
    gradient: "from-slate-300 via-gray-200 to-slate-400",
    border: "border-slate-400/25",
    animatedBorder: "animate-border-silver",
    glow: "from-slate-400 via-gray-300 to-slate-500",
    text: "text-slate-300",
    badgeBg: "bg-slate-500/15",
    badgeBorder: "border-slate-400/20",
    iconColor: "text-slate-300",
    shaderOpacity: "opacity-15 group-hover:opacity-30",
  },
};

/* ─── Sponsor Card ─── */
function SponsorCard({
  sponsor,
  index,
  isPlatinum,
}: {
  sponsor: Sponsor;
  index: number;
  isPlatinum?: boolean;
}) {
  const config = TIER_CONFIG[sponsor.tier];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className={isPlatinum ? "col-span-full flex justify-center" : ""}
    >
      <SpotLightItem
        className={`${isPlatinum ? "w-full max-w-2xl" : "w-full"} !rounded-2xl !bg-transparent`}
      >
        <motion.div
          whileHover={{ y: -8, scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative group w-full"
        >
          {/* Glow effect on hover */}
          <div
            className={`absolute -inset-[1px] rounded-2xl bg-gradient-to-br ${config.glow} opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-500`}
          />

          <div
            className={`relative rounded-2xl overflow-hidden ${config.animatedBorder}`}
          >
            {/* Shader Lines background inside card */}
            <div
              className={`absolute inset-0 ${config.shaderOpacity} transition-opacity duration-700 pointer-events-none`}
            >
              <ShaderLines />
            </div>

            {/* Backdrop blur overlay */}
            <div className="absolute inset-0 backdrop-blur-[1px] pointer-events-none" />

            {/* Top accent bar */}
            <div
              className={`relative h-[2px] bg-gradient-to-r ${config.gradient}`}
            />

            <div className={`relative ${isPlatinum ? "p-8 md:p-10" : "p-6"}`}>
              {/* Tier badge */}
              <div className="flex items-center justify-between mb-5">
                <span
                  className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] font-semibold ${config.badgeBg} border ${config.badgeBorder} ${config.text}`}
                >
                  {config.label}
                </span>
                {sponsor.tier === "platinum" && (
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Crown className="w-5 h-5 text-amber-400 fill-amber-400" />
                  </motion.div>
                )}
              </div>

              {/* Icon & Content */}
              <div
                className={`flex ${isPlatinum ? "flex-col md:flex-row items-center md:items-start gap-6" : "flex-col items-center text-center gap-4"}`}
              >
                {/* Animated icon circle */}
                <motion.div
                  whileHover={{ rotate: 8, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className={`flex-shrink-0 w-16 h-16 ${isPlatinum ? "md:w-20 md:h-20" : ""} rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center ${config.iconColor} group-hover:bg-white/[0.1] group-hover:border-white/20 transition-all duration-300`}
                >
                  {sponsor.icon}
                </motion.div>

                <div className={isPlatinum ? "md:text-left text-center" : ""}>
                  <h3
                    className={`font-bold text-white mb-1 ${isPlatinum ? "text-2xl md:text-3xl" : "text-lg"}`}
                  >
                    {sponsor.name}
                  </h3>
                  <p
                    className={`text-white/50 ${isPlatinum ? "text-base" : "text-sm"} leading-relaxed`}
                  >
                    {sponsor.tagline}
                  </p>

                  {/* Visit link */}
                  <motion.a
                    href={sponsor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1.5 mt-3 text-xs font-medium ${config.text} hover:text-white transition-colors duration-200`}
                    whileHover={{ x: 4 }}
                  >
                    Visit Website
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </motion.a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </SpotLightItem>
    </motion.div>
  );
}

/* ─── Tier Section ─── */
function TierSection({
  title,
  icon,
  sponsors,
  gridCols,
  isPlatinum,
}: {
  title: string;
  icon: React.ReactNode;
  sponsors: Sponsor[];
  gridCols: string;
  isPlatinum?: boolean;
}) {
  return (
    <div className="mb-16">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4 mb-8 max-w-5xl mx-auto"
      >
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/15" />
        <div className="flex items-center gap-2">
          {icon}
          <h2 className="text-white/60 text-sm uppercase tracking-[0.2em] font-medium">
            {title}
          </h2>
        </div>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/15" />
      </motion.div>

      {/* Cards Grid */}
      <Spotlight className={`grid ${gridCols} gap-6 max-w-5xl mx-auto`}>
        {sponsors.map((sponsor, i) => (
          <SponsorCard
            key={sponsor.name}
            sponsor={sponsor}
            index={i}
            isPlatinum={isPlatinum}
          />
        ))}
      </Spotlight>
    </div>
  );
}

/* ─── Page ─── */
export default function SponsorsPage() {
  const platinum = SPONSORS.filter((s) => s.tier === "platinum");
  const gold = SPONSORS.filter((s) => s.tier === "gold");
  const silver = SPONSORS.filter((s) => s.tier === "silver");

  return (
    <div className="min-h-screen w-full flex flex-col relative overflow-hidden">
      {/* Shader Background */}
      <div className="fixed inset-0 z-0">
        <ShaderAnimation />
      </div>

      {/* Dark overlay for readability */}
      <div className="fixed inset-0 z-[1] bg-black/50 pointer-events-none" />

      {/* Navbar */}
      <div className="relative z-10">
        <Navbar />
      </div>

      {/* Page Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 flex-1">
        {/* Header */}
        <div className="text-center mb-16 mt-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">
              Our{" "}
              <CanvasText
                text="Sponsors"
                backgroundClassName="bg-gradient-to-r from-amber-400 to-yellow-500"
                colors={[
                  "rgba(251, 191, 36, 1)",
                  "rgba(251, 191, 36, 0.9)",
                  "rgba(245, 158, 11, 0.8)",
                  "rgba(252, 211, 77, 0.7)",
                  "rgba(251, 191, 36, 0.6)",
                  "rgba(245, 158, 11, 0.5)",
                  "rgba(252, 211, 77, 0.4)",
                  "rgba(251, 191, 36, 0.3)",
                ]}
                lineGap={4}
                animationDuration={20}
              />
            </h1>
          </motion.div>
          <TextGenerateEffect
            words="The incredible partners making Ikyam 2026 possible — powering creativity, culture, and community"
            className="text-lg text-white md:text-xl text-gray-300 max-w-3xl mx-auto"
          />
        </div>

        {/* Platinum Tier */}
        <TierSection
          title="Platinum Partner"
          icon={<Crown className="w-4 h-4 text-amber-400 fill-amber-400" />}
          sponsors={platinum}
          gridCols="grid-cols-1"
          isPlatinum
        />

        {/* Gold Tier */}
        <TierSection
          title="Gold Partners"
          icon={<Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />}
          sponsors={gold}
          gridCols="grid-cols-1 md:grid-cols-3"
        />

        {/* Silver Tier */}
        <TierSection
          title="Silver Partners"
          icon={<Gem className="w-4 h-4 text-slate-400" />}
          sponsors={silver}
          gridCols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        />

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto mb-16"
        >
          <div className="relative group">
            <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-violet-500/30 via-purple-500/20 to-fuchsia-500/30 opacity-60 blur-sm group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative rounded-2xl overflow-hidden border border-violet-500/20 bg-black/60">
              {/* Shader lines in CTA too */}
              <div className="absolute inset-0 opacity-10 group-hover:opacity-25 transition-opacity duration-700 pointer-events-none">
                <ShaderLines />
              </div>
              <div className="relative p-8 md:p-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white">
                  ✨ Become a Sponsor
                </h2>
                <p className="text-gray-400 text-lg mb-6 max-w-xl mx-auto">
                  Partner with Ikyam 2026 and connect your brand with thousands
                  of students, innovators, and creators.
                </p>
                <FancyButton variant="primary" color="violet">
                  📩 Get in Touch
                </FancyButton>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}