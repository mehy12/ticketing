"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Crown, Star, Heart, ExternalLink, Palette, Code2 } from "lucide-react";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { CanvasText } from "@/components/ui/canvas-text";
import { type Platform, XIcon } from "@/components/ui/smoothui/social-selector";
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
  phone?: string;
  email?: string;
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
    name: "Akshyanshu Sekhar Nayak",
    role: "Developer and Designer",
    image: "https://res.cloudinary.com/dsnaaw5iy/image/upload/v1772474183/WhatsApp_Image_2026-03-02_at_11.25.58_PM_fqsr3m.jpg",
    color: "#6366f1",
    handle: "akshsekhr1102",
    phone: "9886667080",
    email: "akshsekhr1102@gmail.com",
    socials: [
      {
        name: "Instagram",
        domain: "instagram.com",
        icon: <InstagramIcon className="h-5 w-5" />,
        url: "https://instagram.com/akshsekhr1102",
      },
    ],
  },
  
  {
    id: "member-2",
    name: "Akash Rajanna",
    role: "Event Contact Person",
    image: "https://res.cloudinary.com/dsnaaw5iy/image/upload/v1772393265/WhatsApp_Image_2026-02-27_at_8.48.20_PM_ywp8uk.jpg",
    color: "#ec4899",
    handle: "akash.rajanna02",
    phone: "8073892740",
    email: "Akash.rajanna02@gmail.com",
    socials: [
      {
        name: "Instagram",
        domain: "instagram.com",
        icon: <InstagramIcon className="h-5 w-5" />,
        url: "https://instagram.com/akash.rajanna02",
      },
    ],
  },
  {
    id: "member-3",
    name: "Bhargav L Reddy",
    role: "Technical Lead",
    image: "https://res.cloudinary.com/dsnaaw5iy/image/upload/v1772393265/WhatsApp_Image_2026-02-27_at_9.10.54_PM_remnmh.jpg",
    color: "#14b8a6",
    handle: "BHARGAV_REDDYY",
    phone: "9686957026",
    email: "bhargavl6336@gmail.com",
    socials: [
      {
        name: "Instagram",
        domain: "instagram.com",
        icon: <InstagramIcon className="h-5 w-5" />,
        url: "https://instagram.com/BHARGAV_REDDYY",
      },
    ],
  },
  {
    id: "member-4",
    name: "Mythri M",
    role: "",
    image: "https://res.cloudinary.com/dsnaaw5iy/image/upload/v1772393897/file_pxlc5m.jpg",
    color: "#f59e0b",
    handle: "mythri",
    socials: [
      {
        name: "Instagram",
        domain: "instagram.com",
        icon: <InstagramIcon className="h-5 w-5" />,
        url: "https://www.instagram.com/mythri_mahesh_/",
      },
    ],
  },
  {
    id: "member-5",
    name: "Vasanth Kumar S",
    role: "",
    image: "https://res.cloudinary.com/dsnaaw5iy/image/upload/v1772393264/WhatsApp_Image_2026-02-27_at_8.37.50_PM_tikh16.jpg",
    color: "#8b5cf6",
    handle: "since_2004",
    phone: "9620300081",
    email: "vasanthkuma2004@gmail.com",
    socials: [
      {
        name: "Instagram",
        domain: "instagram.com",
        icon: <InstagramIcon className="h-5 w-5" />,
        url: "https://instagram.com/since_2004",
      },
    ],
  },
  {
    id: "member-6",
    name: "Hitesh R Sulegai",
    role: "",
    image: "https://res.cloudinary.com/dsnaaw5iy/image/upload/v1772393265/DSC_8867.jpg_pgeuvr.jpg",
    color: "#ef4444",
    handle: "hitesh_sulegaai",
    phone: "7406573131",
    email: "hiteshrsulegai@gmail.com",
    socials: [
      {
        name: "Instagram",
        domain: "instagram.com",
        icon: <InstagramIcon className="h-5 w-5" />,
        url: "https://instagram.com/hitesh_sulegaai",
      },
    ],
  },
  {
    id: "member-9",
    name: "Jithesh U",
    role: "Campaigning Lead",
    image: "https://res.cloudinary.com/dsnaaw5iy/image/upload/v1772393265/WhatsApp_Image_2026-02-27_at_9.02.11_PM_ex2r6l.jpg",
    color: "#06b6d4",
    handle: "jithesh",
    phone: "8722067551",
    email: "jeethurocks2004@gmail.com",
    socials: [
      {
        name: "Instagram",
        domain: "instagram.com",
        icon: <InstagramIcon className="h-5 w-5" />,
        url: "https://www.instagram.com/jeethu_karkera/",
      },
    ],
  },
];

/* ─── FlipCard Component ─── */
function FlipCard({ member }: { member: TeamMember }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="relative w-full h-full cursor-pointer"
      style={{ transformStyle: "preserve-3d", transition: "transform 0.65s cubic-bezier(0.23,1,0.32,1)", transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped((f) => !f)}
    >
      {/* ─── FRONT ─── */}
      <div
        className="absolute inset-0 rounded-[22px] overflow-hidden shadow-2xl"
        style={{ backfaceVisibility: "hidden" }}
      >
        {/* Gradient background */}
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(145deg, ${member.color}ee 0%, ${member.color}88 55%, #111827 100%)` }}
        />
        {/* Large faded role text watermark */}
        <div className="absolute bottom-20 left-0 right-0 px-4 overflow-hidden pointer-events-none select-none" style={{ zIndex: 1 }}>
          <span className="text-[46px] font-black uppercase leading-none tracking-tighter opacity-[0.18] text-white break-words">
            {(member.role || "IKYAM 2026").split(" ").join("\n")}
          </span>
        </div>
        {/* Photo */}
        <img
          src={member.image}
          alt={member.name}
          className="absolute bottom-0 right-0 w-[80%] h-[82%] object-cover object-top"
          style={{ zIndex: 2, maskImage: "linear-gradient(to top, black 55%, transparent 100%)", WebkitMaskImage: "linear-gradient(to top, black 55%, transparent 100%)" }}
        />
        {/* Top-left name tag */}
        <div className="absolute top-5 left-5 z-10">
          <p className="text-white/50 text-[11px] font-medium mb-0.5">Hello, I&apos;m</p>
          <h3 className="text-white text-xl font-bold leading-tight max-w-[130px]">{member.name.split(" ")[0]}</h3>
          {member.role && <p className="text-white/40 text-[10px] mt-0.5 max-w-[130px] leading-snug">{member.role}</p>}
        </div>
        {/* Flip hint */}
        <div className="absolute bottom-4 left-5 z-10">
          <span className="text-white/35 text-[10px] font-medium uppercase tracking-wider">Hover to flip →</span>
        </div>
      </div>

      {/* ─── BACK ─── */}
      <div
        className="absolute inset-0 rounded-[22px] overflow-hidden shadow-2xl bg-white"
        style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
      >
        {/* Colored top strip */}
        <div className="h-1.5 w-full" style={{ background: `linear-gradient(to right, ${member.color}, ${member.color}55)` }} />
        <div className="flex flex-col h-[calc(100%-6px)] p-6">
          {/* Name + role */}
          <div className="mb-4 pb-4 border-b border-gray-200">
            <h3 className="text-gray-900 text-lg font-bold leading-tight">{member.name}</h3>
            {member.role && <p className="text-gray-500 text-sm mt-0.5">{member.role}</p>}
          </div>
          {/* Contact rows */}
          <div className="flex flex-col gap-3 flex-1 overflow-hidden">
            {member.email && (
              <a href={`mailto:${member.email}`} className="flex items-center gap-2.5 hover:opacity-80 transition-opacity" onClick={(e) => e.stopPropagation()}>
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-base">✉️</span>
                <span className="text-xs text-gray-600 truncate">{member.email}</span>
              </a>
            )}
            {member.phone && (
              <a href={`tel:${member.phone}`} className="flex items-center gap-2.5 hover:opacity-80 transition-opacity" onClick={(e) => e.stopPropagation()}>
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-base">📞</span>
                <span className="text-xs text-gray-600">+91 {member.phone}</span>
              </a>
            )}
            {member.socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: `${member.color}20`, color: member.color }}>
                  {social.icon}
                </span>
                <span className="text-xs text-gray-600 flex items-center gap-1 truncate">
                  {social.name}
                  <ExternalLink className="h-2.5 w-2.5 flex-shrink-0 opacity-50" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Page Component ─── */
export default function TeamPage() {

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
                    <p className="text-amber-200/60 text-sm leading-relaxed max-w-md">
                      CONTACT NO: +91 98865 11820
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

        {/* ─── Team Cards Grid ─── */}
        <div className="w-full max-w-5xl mx-auto pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {TEAM_MEMBERS.map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="w-[260px] h-[360px]"
                style={{ perspective: "1000px" }}
              >
                <FlipCard member={member} />
              </motion.div>
            ))}
          </div>
        </div>


        {/* ─── Website Credits Section ─── */}
        <div className="flex items-center gap-4 max-w-5xl mx-auto mb-10 mt-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/30" />
          <h2 className="text-white/80 text-sm uppercase tracking-widest font-medium flex items-center gap-2">
            <Heart className="h-3.5 w-3.5 text-red-400 fill-red-400" />
            Website Credits
            <Heart className="h-3.5 w-3.5 text-red-400 fill-red-400" />
          </h2>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/30" />
        </div>

        <div className="w-full max-w-5xl mx-auto pb-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* ─── Meesam Hyder — Designer & Marketing ─── */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="relative group h-full">
              {/* Animated glow border */}
              <div className="absolute -inset-[2px] rounded-3xl bg-gradient-to-br from-purple-500 via-fuchsia-500 to-pink-500 opacity-60 blur-sm group-hover:opacity-100 group-hover:blur-md transition-all duration-700" />
              <motion.div
                className="absolute -inset-4 rounded-[36px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at center, rgba(168,85,247,0.15) 0%, transparent 70%)",
                }}
              />

              <div className="relative rounded-3xl overflow-hidden border border-purple-500/30 bg-black/80 backdrop-blur-xl h-full">
                {/* Decorative top shimmer */}
                <div className="h-1 bg-gradient-to-r from-purple-500 via-fuchsia-400 to-pink-500" />

                {/* Floating role badge */}
                <div className="absolute top-4 right-4 z-10">
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="p-2.5 rounded-2xl bg-purple-500/20 backdrop-blur-md border border-purple-400/30"
                  >
                    <Palette className="h-5 w-5 text-purple-300" />
                  </motion.div>
                </div>

                <div className="p-8">
                  <div className="flex flex-col items-center text-center">
                    {/* Avatar with animated ring */}
                    <div className="relative mb-5">
                      <motion.div
                        className="absolute -inset-1.5 rounded-full"
                        style={{
                          background: "conic-gradient(from 0deg, #a855f7, #ec4899, #8b5cf6, #a855f7)",
                        }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      />
                      <div className="relative w-28 h-28 rounded-full overflow-hidden border-3 border-black">
                        <img
                          src="https://res.cloudinary.com/dsnaaw5iy/image/upload/v1772429534/604348299_17930929314152217_2394512037423207271_n_acilr9.jpg"
                          alt="Meesam Hyder"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {/* Online-status style dot */}
                      <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-purple-400 border-2 border-black" />
                    </div>

                    {/* Name & Role */}
                    <p className="text-[10px] uppercase tracking-[0.35em] text-purple-400/90 font-bold mb-1.5">
                      Designer & Marketing
                    </p>
                    <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
                      Meesam Hyder
                    </h3>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 justify-center mb-5">
                      <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-300 text-[11px] font-medium">
                        UI/UX Design
                      </span>
                      <span className="px-3 py-1 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/25 text-fuchsia-300 text-[11px] font-medium">
                        Marketing
                      </span>
                      <span className="px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/25 text-pink-300 text-[11px] font-medium">
                        Branding
                      </span>
                    </div>

                    {/* Divider */}
                    <div className="w-full flex items-center gap-3 mb-4">
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-purple-500/30" />
                      <Palette className="h-3 w-3 text-purple-500/40" />
                      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-purple-500/30" />
                    </div>

                    {/* Contact & Social */}
                    <div className="flex flex-col gap-2 w-full">
                      <a
                        href="mailto:tattva.vemanothsav@gmail.com"
                        className="flex items-center justify-center gap-2 text-xs text-white/50 hover:text-purple-300 transition-colors duration-300"
                      >
                        <span>✉️</span>
                        <span>tattva.vemanothsav@gmail.com</span>
                      </a>
                      <div className="flex items-center justify-center gap-2">
                        <a
                          href="https://www.instagram.com/nothaydara/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-500/15 to-fuchsia-500/15 border border-purple-500/20 text-purple-200 text-sm font-medium hover:from-purple-500/25 hover:to-fuchsia-500/25 hover:border-purple-400/40 transition-all duration-300 group/link"
                        >
                          <InstagramIcon className="h-4 w-4 fill-purple-300" />
                          <span>@nothaydara</span>
                          <ExternalLink className="h-3 w-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                        </a>
                        <a
                          href="https://www.linkedin.com/in/mesmhydr/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-500/15 to-fuchsia-500/15 border border-purple-500/20 text-purple-200 text-sm font-medium hover:from-purple-500/25 hover:to-fuchsia-500/25 hover:border-purple-400/40 transition-all duration-300 group/li"
                        >
                          <svg className="h-4 w-4 fill-purple-300" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.83-48.3 93.97 0 111.28 61.9 111.28 142.3V448z" />
                          </svg>
                          <ExternalLink className="h-3 w-3 opacity-0 group-hover/li:opacity-100 transition-opacity" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subtle inner shine */}
                <div
                  className="absolute inset-0 pointer-events-none rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background: "linear-gradient(135deg, rgba(168,85,247,0.06) 0%, transparent 40%, transparent 60%, rgba(236,72,153,0.04) 100%)",
                  }}
                />
              </div>
            </div>
          </motion.div>

          {/* ─── Akshyanshu Sekhar Nayak — Developer & Designer ─── */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          >
            <div className="relative group h-full">
              {/* Animated glow border */}
              <div className="absolute -inset-[2px] rounded-3xl bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-500 opacity-60 blur-sm group-hover:opacity-100 group-hover:blur-md transition-all duration-700" />
              <motion.div
                className="absolute -inset-4 rounded-[36px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at center, rgba(99,102,241,0.15) 0%, transparent 70%)",
                }}
              />

              <div className="relative rounded-3xl overflow-hidden border border-indigo-500/30 bg-black/80 backdrop-blur-xl h-full">
                {/* Decorative top shimmer */}
                <div className="h-1 bg-gradient-to-r from-indigo-500 via-blue-400 to-cyan-500" />

                {/* Floating role badge */}
                <div className="absolute top-4 right-4 z-10">
                  <motion.div
                    animate={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="p-2.5 rounded-2xl bg-indigo-500/20 backdrop-blur-md border border-indigo-400/30"
                  >
                    <Code2 className="h-5 w-5 text-indigo-300" />
                  </motion.div>
                </div>

                <div className="p-8">
                  <div className="flex flex-col items-center text-center">
                    {/* Avatar with animated ring */}
                    <div className="relative mb-5">
                      <motion.div
                        className="absolute -inset-1.5 rounded-full"
                        style={{
                          background: "conic-gradient(from 180deg, #6366f1, #3b82f6, #06b6d4, #6366f1)",
                        }}
                        animate={{ rotate: -360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      />
                      <div className="relative w-28 h-28 rounded-full overflow-hidden border-3 border-black">
                        <img
                          src="https://res.cloudinary.com/dsnaaw5iy/image/upload/v1772473848/download_hqomwr.jpg"
                          alt="Akshyanshu Sekhar Nayak"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {/* Online-status style dot */}
                      <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-indigo-400 border-2 border-black" />
                    </div>

                    {/* Name & Role */}
                    <p className="text-[10px] uppercase tracking-[0.35em] text-indigo-400/90 font-bold mb-1.5">
                      Developer & Designer
                    </p>
                    <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
                      Akshyanshu Sekhar Nayak
                    </h3>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 justify-center mb-5">
                      <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-[11px] font-medium">
                        Full-Stack Dev
                      </span>
                      <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-300 text-[11px] font-medium">
                        UI Design
                      </span>
                      <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-[11px] font-medium">
                        Architecture
                      </span>
                    </div>

                    {/* Divider */}
                    <div className="w-full flex items-center gap-3 mb-4">
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-indigo-500/30" />
                      <Code2 className="h-3 w-3 text-indigo-500/40" />
                      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-indigo-500/30" />
                    </div>

                    {/* Contact & Social */}
                    <div className="flex flex-col gap-2 w-full">
                      <div className="flex items-center justify-center gap-3 text-xs text-white/50">
                        <a
                          href="tel:9886667080"
                          className="flex items-center gap-1.5 hover:text-indigo-300 transition-colors duration-300"
                        >
                          <span>📞</span>
                          <span>9886667080</span>
                        </a>
                        <span className="text-white/20">•</span>
                        <a
                          href="mailto:tattva.vemanothsav@gmail.com"
                          className="flex items-center gap-1.5 hover:text-indigo-300 transition-colors duration-300"
                        >
                          <span>✉️</span>
                          <span>tattva.vemanothsav@gmail.com</span>
                        </a>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <a
                          href="https://www.instagram.com/dammit_aksh/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500/15 to-blue-500/15 border border-indigo-500/20 text-indigo-200 text-sm font-medium hover:from-indigo-500/25 hover:to-blue-500/25 hover:border-indigo-400/40 transition-all duration-300 group/link"
                        >
                          <InstagramIcon className="h-4 w-4 fill-indigo-300" />
                          <span>@dammit_aksh</span>
                          <ExternalLink className="h-3 w-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                        </a>
                        <a
                          href="https://www.linkedin.com/in/dammitaksh/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500/15 to-blue-500/15 border border-indigo-500/20 text-indigo-200 text-sm font-medium hover:from-indigo-500/25 hover:to-blue-500/25 hover:border-indigo-400/40 transition-all duration-300 group/li"
                        >
                          <svg className="h-4 w-4 fill-indigo-300" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.83-48.3 93.97 0 111.28 61.9 111.28 142.3V448z" />
                          </svg>
                          <ExternalLink className="h-3 w-3 opacity-0 group-hover/li:opacity-100 transition-opacity" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subtle inner shine */}
                <div
                  className="absolute inset-0 pointer-events-none rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background: "linear-gradient(135deg, rgba(99,102,241,0.06) 0%, transparent 40%, transparent 60%, rgba(6,182,212,0.04) 100%)",
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}