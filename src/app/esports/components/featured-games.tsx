"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface GameCardProps {
  title: string;
  description: string;
  image: string;
  slug: string;
  color: string;
  index: number;
}

function GameCard({
  title,
  description,
  image,
  slug,
  color,
  index,
}: GameCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      viewport={{ once: true, margin: "-100px" }}
      className="relative overflow-hidden rounded-lg group"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80`}
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t from-${color}/80 to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-700`}
        />
      </div>

      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-300 mb-4 max-w-md">{description}</p>
        <Link
          href={`/esports/${slug}`}
          className={`inline-block bg-${color} text-white px-4 py-2 rounded-sm text-sm font-medium transition-all duration-300 hover:bg-${color}/90 w-fit`}
        >
          View Tournament
        </Link>
      </div>

      {/* Glowing accent */}
      <div
        className={`absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-${color}/30 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
      />
    </motion.div>
  );
}

export function FeaturedGames() {
  const games = [
    {
      title: "FREE FIRE",
      description:
        "4v4 tactical shooter with unique agent abilities. Precision gunplay meets strategic team play.",
      image: "/esports/freefire.jpg",
      slug: "freefire-championship",
      color: "freefire-red",
    },
    {
      title: "BATTLEGROUNDS MOBILE INDIA",
      description:
        "Battle royale action with intense survival gameplay. Squad up and be the last team standing.",
      image: "/esports/bgmi.jfif",
      slug: "bgmi-pro-league",
      color: "bgmi-blue",
    },
    {
      title: "CALL OF DUTY MOBILE",
      description:
        "5v5 action with intense survival gameplay. Squad up and be the last team standing.",
      image: "/esports/codm.jpg",
      slug: "codm-championship",
      color: "codm-blue",
    },
    {
      title: "VALORANT",
      description:
        "5v5 action with intense survival gameplay. Squad up and be the last team standing.",
      image: "/esports/valorant.jfif",
      slug: "valorant-championship",
      color: "valorant-blue",
    },
  ];

  return (
    <div className="relative py-20 overflow-hidden">
      <motion.div
        style={{
          y: useTransform(useScroll().scrollYProgress, [0, 1], [100, -100]),
        }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-[#FF4655]/5 to-transparent transform rotate-12 translate-x-1/4 translate-y-[-10%] blur-3xl" />
        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-[#1F85DE]/5 to-transparent transform -rotate-12 translate-x-[-25%] translate-y-[10%] blur-3xl" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured Games
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Compete in the most popular esports titles and showcase your skills
            on the biggest stage
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {games.map((game, index) => (
            <GameCard key={game.title} {...game} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
