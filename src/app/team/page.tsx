"use client";

import React, { useState } from "react";
import { motion, LayoutGroup } from "framer-motion";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/navbar";
import { Crown, Star } from "lucide-react";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { CanvasText } from "@/components/ui/canvas-text";
import { BlurVignette, BlurVignetteArticle } from "@/../components/uilayouts/blur-vignette";
import SocialSelector, {
  type Platform,
  XIcon,
} from "@/components/ui/smoothui/social-selector";
import dynamic from "next/dynamic";

const Blob = dynamic(() => import("@/components/ui/blob").then(mod => mod.Blob), {
  ssr: false,
  loading: () => null,
});

/* ─── Icon Components ─── */
const InstagramIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
    <title>Instagram</title>
    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
  </svg>
);

const LinkedInIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
    <title>LinkedIn</title>
    <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.83-48.3 93.95 0 111.28 61.9 111.28 142.3V448z" />
  </svg>
);

/* ─── Types ─── */
interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  color: string;
  handle: string;
  socials: Platform[];
}

/* ─── Helpers ─── */
const makeSocials = (handle: string): Platform[] => [
  {
    name: "Instagram",
    domain: "instagram.com",
    icon: <InstagramIcon className="h-5 w-5" />,
    url: `https://instagram.com/${handle}`,
  },
  {
    name: "X",
    domain: "x.com",
    icon: <XIcon className="h-5 w-5" />,
    url: `https://x.com/${handle}`,
  },
  {
    name: "LinkedIn",
    domain: "linkedin.com",
    icon: <LinkedInIcon className="h-5 w-5" />,
    url: `https://linkedin.com/in/${handle}`,
  },
];

// /* ─── Data ─── */
const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "member-1",
    name: "Akshyanshu",
    role: "President",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80",
    color: "#6366f1",
    handle: "akshyanshu",
    socials: makeSocials("akshyanshu"),
  },
  {
    id: "member-2",
    name: "Akash",
    role: "Vice President",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80",
    color: "#ec4899",
    handle: "akash",
    socials: makeSocials("akash"),
  },
  {
    id: "member-3",
    name: "Bhargav",
    role: "Technical Lead",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&auto=format&fit=crop&q=80",
    color: "#14b8a6",
    handle: "bhargav",
    socials: makeSocials("bhargav"),
  },
  {
    id: "member-4",
    name: "Mythri",
    role: "Creative Director",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=80",
    color: "#f59e0b",
    handle: "mythri",
    socials: makeSocials("mythri"),
  },
  {
    id: "member-5",
    name: "Vasant",
    role: "Event Coordinator",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=80",
    color: "#8b5cf6",
    handle: "vasant",
    socials: makeSocials("vasant"),
  },
  {
    id: "member-6",
    name: "Hitesh",
    role: "Logistics Head",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=80",
    color: "#ef4444",
    handle: "hitesh",
    socials: makeSocials("hitesh"),
  },
  {
    id: "member-7",
    name: "Varsha",
    role: "Marketing Head",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&auto=format&fit=crop&q=80",
    color: "#10b981",
    handle: "varsha",
    socials: makeSocials("varsha"),
  },
  {
    id: "member-8",
    name: "Nayana",
    role: "Cultural Secretary",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
    color: "#f97316",
    handle: "nayana",
    socials: makeSocials("nayana"),
  },
  {
    id: "member-9",
    name: "Jitesh",
    role: "Sponsorship Lead",
    image: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=600&auto=format&fit=crop&q=80",
    color: "#06b6d4",
    handle: "jitesh",
    socials: makeSocials("jitesh"),
  },
];

/* ─── Page Component ─── */
export default function TeamPage() {
  const [expandedId, setExpandedId] = useState<string>("member-1");

  return (
    <div className="min-h-screen w-full flex flex-col relative overflow-hidden">
      {/* ─── Green Blob Background with Grain ─── */}
      <div className="fixed inset-0 z-0 bg-[#0a2e1a]">
        <Blob
          color="#1a6b3a"
          followMouse
          fov={15}
          environmentIntensity={0.5}
          className="absolute inset-0 w-full h-full"
        />
      </div>

      {/* Navbar */}
      <div className="relative z-10">
        <Navbar />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12 mt-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">
            Meet{" "}
            <CanvasText
              text="Our Team"
              backgroundClassName="bg-gradient-to-r from-white to-emerald-100"
              colors={[
                "rgba(255, 255, 255, 1)",
                "rgba(255, 255, 255, 0.9)",
                "rgba(236, 253, 245, 0.8)",
                "rgba(209, 250, 229, 0.7)",
                "rgba(255, 255, 255, 0.6)",
                "rgba(236, 253, 245, 0.5)",
                "rgba(209, 250, 229, 0.4)",
                "rgba(255, 255, 255, 0.3)",
              ]}
              lineGap={4}
              animationDuration={20}
            />
          </h1>
          <TextGenerateEffect
            words="The people behind Ikyam 2026 — dedicated faculty and students working together to create an unforgettable experience"
            className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto"
          />
        </div>

        {/* ─── Faculty Fest Coordinator — Royal Card ─── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-2xl mx-auto mb-16"
        >
          <div className="relative group">
            {/* Glowing border effect */}
            <div className="absolute -inset-[2px] rounded-3xl bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-600 opacity-70 blur-sm group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative rounded-3xl overflow-hidden border border-yellow-500/30 bg-black/70 backdrop-blur-xl">
              {/* Decorative top bar */}
              <div className="h-1.5 bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-600" />

              <div className="p-8 md:p-10">
                {/* Crown & Label */}
                <div className="flex items-center justify-center gap-2 mb-6">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <Crown className="h-6 w-6 text-yellow-400 fill-yellow-400" />
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                </div>

                <div className="flex flex-col md:flex-row items-center gap-8">
                  {/* Photo with RevealWaveImage */}
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="relative flex-shrink-0"
                  >
                    {/* Gold ring around photo */}
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-600" />
                    <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-black">
                    </div>
                  </motion.div>

                  {/* Info */}
                  <div className="text-center md:text-left flex-1">
                    <p className="text-xs uppercase tracking-[0.3em] text-yellow-400/80 font-semibold mb-2">
                      Faculty Fest Coordinator
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                      Dr. Aruna Reddy H
                    </h2>
                    <p className="text-amber-200/60 text-sm leading-relaxed max-w-md">
                      Guiding the vision and spirit of Ikyam 2026, ensuring every event reflects the legacy and excellence of Vemana Institute of Technology.
                    </p>

                    {/* Decorative divider */}
                    <div className="flex items-center gap-3 mt-4 justify-center md:justify-start">
                      <div className="h-px w-8 bg-gradient-to-r from-transparent to-yellow-500/50" />
                      <Crown className="h-3 w-3 text-yellow-500/40" />
                      <div className="h-px w-8 bg-gradient-to-l from-transparent to-yellow-500/50" />
                    </div>

                    <div className="mt-4 flex flex-wrap gap-3 justify-center md:justify-start">
                      <span className="px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 text-xs font-medium">
                        Department of ISE
                      </span>
                      <span className="px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 text-xs font-medium">
                        Vemana IT
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ─── Section Divider ─── */}
        <div className="flex items-center gap-4 max-w-5xl mx-auto mb-10">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/30" />
          <h2 className="text-white/80 text-sm uppercase tracking-widest font-medium">
            Student Committee
          </h2>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/30" />
        </div>

        {/* ─── Team Grid with RevealWaveImage Profiles ─── */}
        <div className="w-full max-w-5xl mx-auto pb-16 relative">
          <LayoutGroup id="team-grid">
            <motion.div
              layout
              className="grid grid-cols-2 md:grid-cols-3 gap-5 sm:gap-7 auto-rows-[220px] sm:auto-rows-[300px]"
            >
              {TEAM_MEMBERS.map((member) => {
                const isExpanded = expandedId === member.id;

                return (
                  <motion.div
                    key={member.id}
                    layoutId={`team-${member.id}`}
                    onClick={() => setExpandedId(member.id)}
                    className={cn(
                      "relative cursor-pointer group w-full h-full",
                      isExpanded
                        ? "z-30 col-span-2 row-span-2"
                        : "z-10 col-span-1 row-span-1"
                    )}
                    transition={{
                      layout: {
                        type: "spring",
                        stiffness: 120,
                        damping: 24,
                      },
                    }}
                  >
                    {/* Outer glassy border shell */}
                    <motion.div
                      layoutId={`team-${member.id}-shell`}
                      className="absolute inset-0 rounded-[32px] p-[3px]"
                      style={{
                        background: isExpanded
                          ? `linear-gradient(135deg, ${member.color}66, ${member.color}22, rgba(255,255,255,0.15), ${member.color}22)`
                          : "linear-gradient(135deg, rgba(255,255,255,0.20), rgba(255,255,255,0.08))",
                      }}
                    >
                      {/* Inner card */}
                      <BlurVignette
                        classname="relative w-full h-full !aspect-auto rounded-[30px] overflow-hidden bg-neutral-950"
                        radius="30px"
                        inset="15px"
                        transitionLength="40px"
                        blur="8px"
                      >
                        {/* Profile photo */}
                        <img
                          src={member.image}
                          alt={member.name}
                          className={cn(
                            "absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out",
                            isExpanded
                              ? "scale-105 object-[center_25%]"
                              : "scale-100 object-[center_35%] group-hover:scale-[1.03]"
                          )}
                        />

                        {/* Liquid gradient — subtle color wash */}
                        <div
                          className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none transition-opacity duration-500 group-hover:opacity-30"
                          style={{
                            background: `radial-gradient(ellipse at 30% 80%, ${member.color}44 0%, transparent 60%), radial-gradient(ellipse at 70% 20%, ${member.color}22 0%, transparent 50%)`,
                          }}
                        />

                        {/* Bottom frosted glass panel */}
                        <motion.div
                          layoutId={`team-${member.id}-glass`}
                          className="absolute inset-x-0 bottom-0 z-10"
                        >
                          <div
                            className={cn(
                              "backdrop-blur-xl border-t transition-all duration-500",
                              isExpanded
                                ? "bg-black/50 border-white/15 px-6 py-5 sm:px-8 sm:py-6"
                                : "bg-black/40 border-white/10 px-4 py-3 sm:px-5 sm:py-4"
                            )}
                          >
                            <motion.h3
                              layout="position"
                              className={cn(
                                "font-bold text-white tracking-tight leading-tight transition-all duration-300",
                                isExpanded
                                  ? "text-2xl sm:text-3xl mb-1"
                                  : "text-sm sm:text-lg mb-0.5"
                              )}
                            >
                              {member.name}
                            </motion.h3>
                            <motion.p
                              layout="position"
                              className={cn(
                                "font-medium transition-all duration-300",
                                isExpanded
                                  ? "text-sm sm:text-base text-white/70"
                                  : "text-[11px] sm:text-sm text-white/50"
                              )}
                            >
                              {member.role}
                            </motion.p>

                            {/* Social links — revealed on expand */}
                            {isExpanded && (
                              <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.25, duration: 0.3 }}
                                className="mt-3 pt-3 border-t border-white/10"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <SocialSelector
                                  platforms={member.socials}
                                  handle={member.handle}
                                  className="!my-0 !text-left"
                                />
                              </motion.div>
                            )}
                          </div>
                        </motion.div>

                        {/* Inner shine — liquid glass highlight */}
                        <div
                          className={cn(
                            "absolute inset-0 pointer-events-none rounded-[30px] transition-opacity duration-500",
                            isExpanded ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                          )}
                          style={{
                            background:
                              "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.03) 100%)",
                          }}
                        />
                      </BlurVignette>
                    </motion.div>

                    {/* Glow effect on expand */}
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="absolute -inset-2 rounded-[36px] pointer-events-none -z-10 blur-xl"
                        style={{
                          background: `radial-gradient(ellipse at center, ${member.color}30 0%, transparent 70%)`,
                        }}
                      />
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          </LayoutGroup>
        </div>
      </div>
    </div>
  );
}