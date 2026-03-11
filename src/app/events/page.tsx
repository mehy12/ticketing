"use client";

import { useState, useMemo } from "react";
import { EventCard, type Event } from "@/components/event-card";
import { Navbar } from "@/components/navbar";
import DiscreteTabs, { type TabItem } from "@/components/discrete-tabs";
import FancyButton from "@/components/ui/fancy-button";
import { motion, AnimatePresence } from "framer-motion";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { CanvasText } from "@/components/ui/canvas-text";
import { LiquidGlassCard } from "@/components/liquid-glass";

// Category icon components
const AllIcon: React.FC<React.SVGProps<SVGSVGElement> & { size?: number }> = ({
  size = 20,
  ...props
}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
  </svg>
);

const DanceIcon: React.FC<React.SVGProps<SVGSVGElement> & { size?: number }> = ({
  size = 20,
  ...props
}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="4" r="2" /><path d="M12 6v4l3 4-3 2-3-2 3-4V6z" /><path d="M9 18l-3 4" /><path d="M15 18l3 4" />
  </svg>
);

const MusicIcon: React.FC<React.SVGProps<SVGSVGElement> & { size?: number }> = ({
  size = 20,
  ...props
}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
  </svg>
);

const FilmIcon: React.FC<React.SVGProps<SVGSVGElement> & { size?: number }> = ({
  size = 20,
  ...props
}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" /><line x1="7" y1="2" x2="7" y2="22" /><line x1="17" y1="2" x2="17" y2="22" /><line x1="2" y1="12" x2="22" y2="12" /><line x1="2" y1="7" x2="7" y2="7" /><line x1="2" y1="17" x2="7" y2="17" /><line x1="17" y1="7" x2="22" y2="7" /><line x1="17" y1="17" x2="22" y2="17" />
  </svg>
);

const GameIcon: React.FC<React.SVGProps<SVGSVGElement> & { size?: number }> = ({
  size = 20,
  ...props
}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="6" y1="11" x2="10" y2="11" /><line x1="8" y1="9" x2="8" y2="13" /><line x1="15" y1="12" x2="15.01" y2="12" /><line x1="18" y1="10" x2="18.01" y2="10" /><path d="M17.32 5H6.68a4 4 0 00-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 003 3c1.4 0 2.1-1 2.5-2l.5-1h8l.5 1c.4 1 1.1 2 2.5 2a3 3 0 003-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0017.32 5z" />
  </svg>
);

const ArtIcon: React.FC<React.SVGProps<SVGSVGElement> & { size?: number }> = ({
  size = 20,
  ...props
}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="13.5" cy="6.5" r=".5" /><circle cx="17.5" cy="10.5" r=".5" /><circle cx="8.5" cy="7.5" r=".5" /><circle cx="6.5" cy="12.5" r=".5" />
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 011.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
  </svg>
);

const BrainIcon: React.FC<React.SVGProps<SVGSVGElement> & { size?: number }> = ({
  size = 20,
  ...props
}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 2a4 4 0 0 0-4 4v2H6a4 4 0 0 0-4 4 4 4 0 0 0 4 4h2v2a4 4 0 0 0 4 4 4 4 0 0 0 4-4v-2h2a4 4 0 0 0 4-4 4 4 0 0 0-4-4h-2V6a4 4 0 0 0-4-4z" />
  </svg>
);

type EventCategory = "all" | "dance" | "music" | "film" | "gaming" | "art" | "brain";

interface CategorizedEvent extends Event {
  category: EventCategory;
}

const CATEGORY_TABS: TabItem[] = [
  { id: "all", title: "All", icon: AllIcon },
  { id: "dance", title: "Dance", icon: DanceIcon },
  { id: "music", title: "Music", icon: MusicIcon },
  { id: "film", title: "Film", icon: FilmIcon },
  { id: "gaming", title: "Gaming", icon: GameIcon },
  { id: "art", title: "Art", icon: ArtIcon },
  { id: "brain", title: "Brain", icon: BrainIcon },
];

export default function EventPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/IKYAM_Official.pdf";
    link.download = "IKYAM.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const events: CategorizedEvent[] = [
    // Dance
    {
      title: "Solo Dance",
      image: "/events/solo-dance.jpg",
      description: "Show your moves in Hip-Hop, Breakdance, Freestyle or any dance style.",
      isPublished: true,
      category: "dance",
      date: "March 27, 2026",
    },
    {
      title: "Western Group Dance",
      image: "/events/western-group-dance.jpg",
      description: "High-energy group choreography in Western dance styles.",
      isPublished: true,
      category: "dance",
      date: "March 28, 2026",
    },
    {
      title: "Indian Group Dance",
      image: "/events/indian-group-dance.jpg",
      description: "Celebrate classical, folk, Bollywood, and Indian fusion dance forms.",
      isPublished: true,
      category: "dance",
      date: "March 28, 2026",
    },
    {
      title: "On Spot Choreography",
      image: "/events/on-spot-choreography.jpg",
      description: "Perform instantly to a surprise track — no preparation time.",
      isPublished: true,
      category: "dance",
      date: "March 27, 2026",
    },
    {
      title: "Duo Dance",
      image: "/events/duo-dance.jpg",
      description: "Two dancers. One stage. Perfect synchronization.",
      isPublished: true,
      category: "dance",
      date: "March 28, 2026",
    },
    // Music
    {
      title: "Solo Singing",
      image: "/events/solo-singing.jpg",
      description: "Showcase your vocal talent across any genre.",
      isPublished: true,
      category: "music",
      date: "March 27, 2026",
    },
    {
      title: "Group Singing",
      image: "/events/group-singing.jpg",
      description: "Perform live with harmony, rhythm, and coordination.",
      isPublished: true,
      category: "music",
      date: "March 27, 2026",
    },
    {
      title: "Rap & Boxing",
      image: "/events/rap-and-boxing.jpg",
      description: "Bring rhythm, flow, and lyrical energy to the stage.",
      isPublished: true,
      category: "music",
      date: "March 28, 2026",
    },
    // Film & Media
    {
      title: "Reel Making Competition",
      image: "/events/reel-making-competition.jpg",
      description: "Create and edit a 60-second reel on the spot.",
      isPublished: true,
      category: "film",
      date: "March 27, 2026",
    },
    {
      title: "Final Cut – Short Film",
      image: "/events/final-cut-short-film.jpg",
      description: "Present an original short film at the Vemanotsava Film Festival.",
      isPublished: true,
      category: "film",
      date: "March 27, 2026",
    },
    {
      title: "Beyond The Lens – Photography",
      image: "/events/beyond-the-lens.jpg",
      description: "Mobile photography competition. Capture creativity and present your best shot in 5 minutes.",
      isPublished: true,
      category: "film",
      date: "March 28, 2026",
    },
    // Gaming
    {
      title: "Esports Tournament",
      image: "/events/esports-tournament.jpg",
      description: "Compete in BGMI, Call of Duty Mobile, and Free Fire.",
      isPublished: true,
      category: "gaming",
      date: "March 27, 2026",
    },
    // Art & Performance
    {
      title: "Stand Up Comedy",
      image: "/events/stand-up-comedy.jpg",
      description: "Make the audience laugh with your original comedic performance.",
      isPublished: true,
      category: "art",
      date: "March 28, 2026",
    },
    {
      title: "Mr. & Ms. Aura",
      image: "/events/mr-ms-aura.jpg",
      description: "Showcase personality, confidence, and stage presence.",
      isPublished: true,
      category: "art",
      date: "March 28, 2026",
    },
    {
      title: "Canvas Painting",
      image: "/events/canvas-painting.jpg",
      description: "Express creativity through art on canvas.",
      isPublished: true,
      category: "art",
      date: "March 27, 2026",
    },
    {
      title: "Fashion Show",
      image: "/events/fashion-show.jpg",
      description: "Present a creative theme with coordinated ramp performance.",
      isPublished: true,
      category: "art",
      date: "March 27, 2026",
    },
    // {
    //   title: "Echoes of Poetry",
    //   image: "/events/web-designing.jpg",
    //   description: "Unleash your inner poet and let your words paint vivid pictures on canvas.",
    //   isPublished: true,
    //   category: "art",
    // },
    // Brain & Strategy
    {
      title: "The Great Hunt – Treasure Hunt",
      image: "/events/the-great-hunt.jpg",
      description: "Solve clues across campus and race to the final destination.",
      isPublished: true,
      category: "brain",
      date: "March 28, 2026",
    },
    {
      title: "Can You Guess? – Quiz Competition",
      image: "/events/can-you-guess.jpg",
      description: "Test your knowledge in a multi-round quiz challenge.",
      isPublished: true,
      category: "brain",
      date: "March 27, 2026",
    },
    {
      title: "Shark Tank – Capital Quest",
      image: "/events/shark-tank.jpg",
      description: "Pitch your innovative business idea to a panel of judges.",
      isPublished: true,
      category: "brain",
      date: "March 28, 2026",
    },
    {
      title: "Chamber of Secrets – Escape Room",
      image: "/events/chamber-of-secrets.jpg",
      description: "Team-based escape challenge. Solve puzzles and race against time to break free.",
      isPublished: true,
      category: "brain",
      date: "March 27, 2026",
    },
    {
      title: "Inkspire – Creative Writing",
      image: "/events/inkspire.jpg",
      description: "Team storytelling challenge with a unique Universe Switch concept.",
      isPublished: true,
      category: "brain",
      date: "March 28, 2026",
    },
    {
      title: "Air Crash",
      image: "/events/air-crash.jpg",
      description: "Role-play debate event. Convince the panel why you deserve to survive.",
      isPublished: true,
      category: "brain",
      date: "March 28, 2026",
    },
    {
      title: "House of Games",
      image: "/events/house-of-games.jpg",
      description: "High-energy survival-based team competition with multiple rounds.",
      isPublished: true,
      category: "brain",
      date: "March 27, 2026",
    },
  ];

  const filteredEvents = useMemo(() => {
    let result = activeCategory === "all" ? events : events.filter((e) => e.category === activeCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeCategory, searchQuery]);

  const categoryLabel = CATEGORY_TABS.find((t) => t.id === activeCategory)?.title ?? "All";

  return (
    <div
      className="min-h-screen w-full flex flex-col bg-fixed bg-cover bg-center bg-no-repeat "
      style={{ backgroundImage: "url('/background.png')" }}
    >
      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <div className="bg-gradient-to-b from-transparent via-transparent/90 to-transparent/90">
        <div className="container mx-auto px-4 py-8 ">
        {/* Header Section */}
        <div className="text-center mb-8 mt-8">
          <div className="relative z-10 container mx-auto px-4 py-8">
            {/* Page Header */}
            <div className="text-center mb-12 mt-8">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">
                Ikyam 2026{" "}
                <CanvasText
                  text="Events"
                  backgroundClassName="bg-gradient-to-r from-red-500 to-rose-600"
                  colors={[
                    "rgba(220, 38, 38, 1)",
                    "rgba(220, 38, 38, 0.9)",
                    "rgba(239, 68, 68, 0.8)",
                    "rgba(244, 63, 94, 0.7)",
                    "rgba(220, 38, 38, 0.6)",
                    "rgba(239, 68, 68, 0.5)",
                    "rgba(244, 63, 94, 0.4)",
                    "rgba(220, 38, 38, 0.3)",
                  ]}
                  lineGap={4}
                  animationDuration={20}
                />
              </h1>
              <TextGenerateEffect
                words="Explore all the exciting events at Ikyam 2026 — from dance and music to gaming and brain challenges"
                className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto"
              />
            </div>
          </div>

          {/* Prize Pool Banner */}
          <div className="flex justify-center mb-8">
            <div className="relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl border border-yellow-400/40 bg-gradient-to-r from-yellow-500/10 via-yellow-400/15 to-amber-500/10 backdrop-blur-md shadow-[0_0_30px_rgba(234,179,8,0.25)] group">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400/5 to-amber-400/5 animate-pulse" />
              <span className="text-3xl">🏆</span>
              <div className="text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow-400/80 mb-0.5">Overall Prize Pool</p>
                <p className="text-3xl md:text-4xl font-black tracking-tight">
                  <span className="bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(234,179,8,0.6)]">₹1,00,000</span>
                </p>
                <p className="text-xs text-yellow-300/60 mt-0.5 font-medium">Worth of prizes across all events</p>
              </div>
              <span className="text-3xl">🏆</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex justify-center mb-6">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-10 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400/60 focus:ring-2 focus:ring-yellow-400/20 backdrop-blur-md transition-all duration-200 text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex justify-center mb-2">
            <DiscreteTabs
              tabs={CATEGORY_TABS}
              activeTab={activeCategory}
              onChange={setActiveCategory}
            />
          </div>
          <p className="text-sm text-gray-400 mt-3">
            Showing <span className="text-white font-semibold">{filteredEvents.length}</span>{" "}
            {filteredEvents.length === 1 ? "event" : "events"}
            {activeCategory !== "all" && (
              <> in <span className="text-orange-400 font-semibold">{categoryLabel}</span></>
            )}
            {searchQuery.trim() && (
              <> for <span className="text-yellow-400 font-semibold">&ldquo;{searchQuery}&rdquo;</span></>
            )}
          </p>
        </div>

        {/* Events Grid */}
        <motion.div
          layout
          className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-16"
        >
          <AnimatePresence mode="popLayout">
            {filteredEvents.map((event, i) => (
              <motion.div
                key={event.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{
                  opacity: { duration: 0.2 },
                  layout: { type: "spring", stiffness: 300, damping: 30 },
                }}
              >
                <EventCard event={event} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Brochure Download Section */}
        <LiquidGlassCard draggable={false} borderRadius="16px" blurIntensity="lg" shadowIntensity="sm" glowIntensity="xs" className="p-8 text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            🎉 Want More Details?
          </h2>
          <p className="text-lg text-gray-300 mb-6">
            Get complete information about all our events, rules, and prizes by
            downloading the official brochure.
          </p>
          <FancyButton variant="primary" color="gold" onClick={handleDownload}>
            📥 Download Brochure
          </FancyButton>
        </LiquidGlassCard>
      </div>
      </div>
    </div>
  );
}
