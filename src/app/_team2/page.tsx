"use client";

import React, { useState } from "react";
import { motion, LayoutGroup } from "framer-motion";
import { cn } from "@/lib/utils";
import { SparklesCore } from "@/components/sparkles";
import SocialSelector, {
  type Platform,
  XIcon,
} from "@/components/ui/smoothui/social-selector";

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

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  color: string;
  handle: string;
  socials: Platform[];
}

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

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "member-1",
    name: "Aarav Sharma",
    role: "President",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80",
    color: "#6366f1",
    handle: "aaravsharma",
    socials: makeSocials("aaravsharma"),
  },
  {
    id: "member-2",
    name: "Priya Reddy",
    role: "Vice President",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=80",
    color: "#ec4899",
    handle: "priyareddy",
    socials: makeSocials("priyareddy"),
  },
  {
    id: "member-3",
    name: "Karthik Nair",
    role: "Technical Lead",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80",
    color: "#14b8a6",
    handle: "karthiknair",
    socials: makeSocials("karthiknair"),
  },
  {
    id: "member-4",
    name: "Meera Joshi",
    role: "Creative Director",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&auto=format&fit=crop&q=80",
    color: "#f59e0b",
    handle: "meerajoshi",
    socials: makeSocials("meerajoshi"),
  },
  {
    id: "member-5",
    name: "Rohan Patel",
    role: "Event Coordinator",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&auto=format&fit=crop&q=80",
    color: "#8b5cf6",
    handle: "rohanpatel",
    socials: makeSocials("rohanpatel"),
  },
  {
    id: "member-6",
    name: "Ananya Gupta",
    role: "Marketing Head",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
    color: "#ef4444",
    handle: "ananyagupta",
    socials: makeSocials("ananyagupta"),
  },
];

export default function Team2Page() {
  const [expandedId, setExpandedId] = useState<string>("member-1");

  const handleExpand = (id: string) => {
    setExpandedId(id);
  };

  return (
    <div className="min-h-screen w-full bg-black relative overflow-hidden">
      {/* Sparkles background */}
      <div className="absolute inset-0 w-full h-full">
        <SparklesCore
          id="team-sparkles"
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={30}
          className="w-full h-full"
          particleColor="#FFFFFF"
          speed={0.5}
        />
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-3">
            Our Team
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base max-w-md mx-auto">
            The people behind Vemanothsav 2026
          </p>
        </div>

        {/* Team Grid */}
        <div className="w-full max-w-5xl mx-auto">
          <LayoutGroup id="team-grid">
            <motion.div
              layout
              className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 auto-rows-[180px] sm:auto-rows-[240px]"
            >
              {TEAM_MEMBERS.map((member) => {
                const isExpanded = expandedId === member.id;

                return (
                  <motion.div
                    key={member.id}
                    layoutId={`team-${member.id}`}
                    onClick={() => handleExpand(member.id)}
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
                    {/* Image container */}
                    <motion.div
                      layoutId={`team-${member.id}-mask`}
                      className="absolute inset-0 overflow-hidden"
                      style={{ borderRadius: 24 }}
                    >
                      <img
                        src={member.image}
                        alt={member.name}
                        className={cn(
                          "absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out",
                          isExpanded
                            ? "scale-105 object-[center_30%]"
                            : "scale-100 object-[center_40%]"
                        )}
                      />
                      {/* Dark overlay */}
                      <motion.div
                        layoutId={`team-${member.id}-overlay-dark`}
                        className={cn(
                          "absolute inset-0 transition-colors duration-500",
                          isExpanded ? "bg-black/10" : "bg-black/40"
                        )}
                      />
                    </motion.div>

                    {/* Gradient overlay */}
                    <motion.div
                      layoutId={`team-${member.id}-gradient`}
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        borderRadius: 24,
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 40%, transparent 70%)",
                      }}
                    />

                    {/* Content */}
                    <motion.div
                      layout="position"
                      className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-end text-white z-10 select-none"
                    >
                      <motion.div layout="position" className="overflow-hidden">
                        <motion.h3
                          layout="position"
                          className={cn(
                            "font-semibold tracking-tight mb-0.5 transition-all duration-300",
                            isExpanded
                              ? "text-2xl sm:text-3xl"
                              : "text-base sm:text-xl"
                          )}
                        >
                          {member.name}
                        </motion.h3>
                        <motion.p
                          layout="position"
                          className={cn(
                            "font-normal whitespace-nowrap transition-all duration-300",
                            isExpanded
                              ? "text-sm sm:text-base text-white/80"
                              : "text-xs sm:text-sm text-white/60"
                          )}
                        >
                          {member.role}
                        </motion.p>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.3 }}
                            className="mt-3"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <SocialSelector
                              platforms={member.socials}
                              handle={member.handle}
                              className="!my-0 !text-left"
                            />
                          </motion.div>
                        )}
                      </motion.div>
                    </motion.div>

                    {/* Border */}
                    <motion.div
                      layoutId={`team-${member.id}-border`}
                      className={cn(
                        "absolute inset-0 border transition-colors duration-500 pointer-events-none",
                        isExpanded
                          ? "border-white/20"
                          : "border-white/5 group-hover:border-white/15"
                      )}
                      style={{ borderRadius: 24 }}
                    />

                    {/* Colored accent line at bottom */}
                    {isExpanded && (
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                        className="absolute bottom-0 left-6 right-6 h-[3px] rounded-full origin-left"
                        style={{ backgroundColor: member.color }}
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
