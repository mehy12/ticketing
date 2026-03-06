"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface GameCardProps {
  title: string;
  description: string;
  image: string;
  slug: string;
  accent: string;
  accentRgb: string;
  status: string;
  index: number;
}

function GameCard({
  title,
  description,
  image,
  slug,
  accent,
  accentRgb,
  status,
  index,
}: GameCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-100, 100], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-8, 8]), { stiffness: 300, damping: 30 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      viewport={{ once: true, margin: "-80px" }}
      style={{ perspective: 800 }}
      className="group"
    >
      <motion.div
        style={{ rotateX, rotateY }}
        onMouseMove={handleMouse}
        onMouseLeave={handleLeave}
        className="relative overflow-hidden rounded-xl cursor-pointer"
      >
        {/* Animated border */}
        <div
          className="absolute -inset-[1px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: `linear-gradient(135deg, ${accent}50, transparent 40%, transparent 60%, ${accent}50)`,
          }}
        />

        {/* Card body */}
        <div className="relative bg-black/90 rounded-xl overflow-hidden border border-white/5 group-hover:border-transparent transition-colors duration-500">
          {/* Image */}
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
            />
            {/* Color overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700"
              style={{ background: `linear-gradient(to top, ${accent}80, transparent)` }}
            />

            {/* Status badge */}
            <div className="absolute top-4 right-4 z-10">
              <motion.div
                animate={{ boxShadow: [`0 0 12px ${accentRgb}40`, `0 0 24px ${accentRgb}60`, `0 0 12px ${accentRgb}40`] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="px-3 py-1 rounded-sm text-[10px] font-bold tracking-[0.2em] uppercase backdrop-blur-md border"
                style={{
                  backgroundColor: `${accent}20`,
                  color: accent,
                  borderColor: `${accent}40`,
                }}
              >
                {status}
              </motion.div>
            </div>

            {/* Bottom glow */}
            <div
              className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-20 blur-3xl opacity-0 group-hover:opacity-60 transition-opacity duration-700"
              style={{ backgroundColor: accent }}
            />
          </div>

          {/* Content */}
          <div className="relative p-5 md:p-6">
            {/* Scan line texture */}
            <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.01)_2px,rgba(255,255,255,0.01)_4px)] pointer-events-none" />

            <h3
              className="text-xl md:text-2xl font-black text-white mb-2 tracking-wide"
              style={{ textShadow: `0 0 20px ${accentRgb}00, 0 0 40px ${accentRgb}00` }}
            >
              <span className="group-hover:drop-shadow-[0_0_12px_var(--card-glow)] transition-all duration-500"
                style={{ "--card-glow": `${accentRgb}80` } as React.CSSProperties}
              >
                {title}
              </span>
            </h3>
            <p className="text-gray-400 text-sm mb-5 leading-relaxed max-w-md">{description}</p>

            <Link
              href={`/esports/${slug}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm text-sm font-bold tracking-wider transition-all duration-300 border group-hover:scale-[1.02]"
              style={{
                backgroundColor: `${accent}15`,
                color: accent,
                borderColor: `${accent}40`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = accent;
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.boxShadow = `0 0 20px ${accentRgb}50`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = `${accent}15`;
                e.currentTarget.style.color = accent;
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              VIEW TOURNAMENT
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function FeaturedGames() {
  const games = [
    {
      title: "FREE FIRE",
      description: "Battle royale survival at its finest. Squad up, strategize, and be the last team standing in this fast-paced mobile shooter.",
      image: "/esports/freefire.jpg",
      slug: "freefire-championship",
      accent: "#FF5722",
      accentRgb: "rgba(255,87,34",
      status: "OPEN",
    },
    {
      title: "BGMI",
      description: "Battle royale action with intense survival gameplay. Squad up and be the last team standing in this tactical shooter.",
      image: "/esports/bgmi.jfif",
      slug: "bgmi-pro-league",
      accent: "#1F85DE",
      accentRgb: "rgba(31,133,222",
      status: "OPEN",
    },
    {
      title: "CALL OF DUTY MOBILE",
      description: "Fast-paced 5v5 action with legendary maps and weapons. Dominate the battlefield with your squad.",
      image: "/esports/codm.jpg",
      slug: "codm-championship",
      accent: "#4CAF50",
      accentRgb: "rgba(76,175,80",
      status: "OPEN",
    },
    {
      title: "VALORANT",
      description: "5v5 tactical shooter with unique agent abilities. Precision gunplay meets strategic teamplay on the ultimate stage.",
      image: "/esports/valorant.jfif",
      slug: "valorant-championship",
      accent: "#FF4655",
      accentRgb: "rgba(255,70,85",
      status: "OPEN",
    },
  ];

  return (
    <div className="relative py-24 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-[#FF4655]/5 to-transparent blur-3xl transform translate-x-1/4 -translate-y-[10%]" />
        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-tr from-[#1F85DE]/5 to-transparent blur-3xl transform -translate-x-1/4 translate-y-[10%]" />
        {/* Hex grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='52' viewBox='0 0 60 52' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 15v22L30 52 0 37V15z' fill='none' stroke='white' stroke-width='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: "60px 52px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="block h-[2px] bg-[#FF4655] mx-auto mb-6"
          />
          <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">
            <span className="text-white">FEATURED </span>
            <span className="text-[#FF4655]" style={{ textShadow: "0 0 20px rgba(255,70,85,0.3)" }}>GAMES</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-base">
            Compete in the most popular esports titles and showcase your skills on the biggest stage
          </p>
        </motion.div>

        {/* Game cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {games.map((game, index) => (
            <GameCard key={game.title} {...game} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
