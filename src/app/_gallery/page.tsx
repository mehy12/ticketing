import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import Image from "next/image";
import {
  ContainerScroll,
  BentoGrid,
  BentoCell,
} from "@/components/hero-gallery-scroll-animation";
import Gallery3DHero from "@/components/gallery-3d-hero";
import InfiniteGallery from "@/components/3d-gallery-photography";

export const metadata: Metadata = {
  title: "Gallery | Vemanothsav 2026",
  description:
    "Explore the Vemanothsav 2026 gallery — a visual celebration of dance, music, arts, and culture at Vemana Institute of Technology, Bangalore.",
  openGraph: {
    title: "Gallery | Vemanothsav 2026",
    description:
      "Relive the energy of Vemanothsav 2026 through our event gallery — dance, music, art, and more.",
    url: "https://vemanothsav.in/gallery",
  },
};

const eventImages = [
  { src: "/events/solo-dance.jpg", alt: "Solo Dance" },
  { src: "/events/western-group-dance.jpg", alt: "Western Group Dance" },
  { src: "/events/indian-group-dance.jpg", alt: "Indian Group Dance" },
  { src: "/events/on-spot-choreography.jpg", alt: "On Spot Choreography" },
  { src: "/events/duo-dance.jpg", alt: "Duo Dance" },
  { src: "/events/solo-singing.jpg", alt: "Solo Singing" },
  { src: "/events/group-singing.jpg", alt: "Group Singing" },
  { src: "/events/rap-and-boxing.jpg", alt: "Rap & Boxing" },
  { src: "/events/stand-up-comedy.jpg", alt: "Stand Up Comedy" },
  { src: "/events/reel-making-competition.jpg", alt: "Reel Making" },
  { src: "/events/fashion-show.jpg", alt: "Fashion Show" },
  { src: "/events/mr-ms-aura.jpg", alt: "Mr & Ms Aura" },
  { src: "/events/esports-tournament.jpg", alt: "Esports Tournament" },
  { src: "/events/shark-tank.jpg", alt: "Shark Tank" },
  { src: "/events/canvas-painting.jpg", alt: "Canvas Painting" },
  { src: "/events/inkspire.jpg", alt: "Inkspire" },
  { src: "/events/final-cut-short-film.jpg", alt: "Final Cut Short Film" },
  { src: "/events/beyond-the-lens.jpg", alt: "Beyond The Lens" },
  { src: "/events/air-crash.jpg", alt: "Air Crash" },
  { src: "/events/house-of-games.jpg", alt: "House of Games" },
  { src: "/events/the-great-hunt.jpg", alt: "The Great Hunt" },
  { src: "/events/chamber-of-secrets.jpg", alt: "Chamber of Secrets" },
  { src: "/events/can-you-guess.jpg", alt: "Can You Guess" },
];

// Groups for bento grid — 5 images per section
const bentoGroups = [
  eventImages.slice(0, 5),
  eventImages.slice(5, 10),
  eventImages.slice(10, 15),
  eventImages.slice(15, 20),
  eventImages.slice(20, 23), // last 3 — use threeCells variant
];

type BentoVariant = "default" | "threeCells" | "fourCells";

function GalleryBentoSection({
  images,
  variant = "default",
  label,
}: {
  images: { src: string; alt: string }[];
  variant?: BentoVariant;
  label?: string;
}) {
  return (
    <ContainerScroll
      className="py-12"
      style={{ minHeight: "120vh" }}
    >
      {label && (
        <p className="text-center text-xs uppercase tracking-[0.3em] text-white/40 mb-6 font-semibold">
          {label}
        </p>
      )}
      <BentoGrid
        variant={variant}
        className="h-[55vh] md:h-[75vh] px-4 md:px-16 gap-3"
      >
        {images.map((img, i) => (
          <BentoCell
            key={i}
            className="relative overflow-hidden rounded-2xl group"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-60" />
            {/* label */}
            <span className="absolute bottom-4 left-4 text-white text-sm font-semibold tracking-wide drop-shadow-lg">
              {img.alt}
            </span>
          </BentoCell>
        ))}
      </BentoGrid>
    </ContainerScroll>
  );
}

export default function GalleryPage() {
  return (
    <div
      className="min-h-screen w-full flex flex-col"
      style={{ background: "linear-gradient(135deg, #0a0a0f 0%, #0f0a1a 50%, #0a0f0a 100%)" }}
    >
      {/* Navbar */}
      <Navbar />

      {/* ── Hero: 3D Infinite Gallery ── */}
      <section className="relative w-full" style={{ height: "100svh" }}>
        {/* Title overlay */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-start pt-28 pointer-events-none">
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tight drop-shadow-2xl">
            Gallery
          </h1>
          <p className="mt-3 text-base md:text-lg text-white/50 tracking-widest uppercase font-medium">
            Vemanothsav 2026
          </p>
          {/* scroll hint */}
          <div className="absolute bottom-10 flex flex-col items-center gap-2 animate-bounce">
            <p className="text-white/30 text-xs tracking-widest uppercase">
              Scroll to explore
            </p>
            <svg
              className="w-5 h-5 text-white/30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {/* 3D Tunnel Gallery */}
        <Gallery3DHero
          images={eventImages}
          className="w-full h-full"
          speed={0.8}
          visibleCount={16}
          fadeSettings={{
            fadeIn: { start: 0.03, end: 0.2 },
            fadeOut: { start: 0.75, end: 0.92 },
          }}
          blurSettings={{
            blurIn: { start: 0.0, end: 0.12 },
            blurOut: { start: 0.78, end: 0.95 },
            maxBlur: 5.0,
          }}
        />

        {/* bottom fade into sections below */}
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#0a0a0f] to-transparent z-10 pointer-events-none" />
      </section>

      {/* ── Divider ── */}
      <div className="flex items-center gap-6 px-12 py-4">
        <div className="flex-1 h-px bg-white/10" />
        <p className="text-white/20 text-xs tracking-[0.4em] uppercase font-semibold whitespace-nowrap">
          Event Highlights
        </p>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      {/* ── Bento Scroll Sections ── */}
      <div className="flex flex-col">
        <GalleryBentoSection images={bentoGroups[0]} variant="default" label="Dance" />
        <GalleryBentoSection images={bentoGroups[1]} variant="default" label="Music & Performance" />
        <GalleryBentoSection images={bentoGroups[2]} variant="default" label="Fashion & Esports" />
        <GalleryBentoSection images={bentoGroups[3]} variant="default" label="Arts & Media" />
        <GalleryBentoSection images={bentoGroups[4]} variant="threeCells" label="Competitions" />
      </div>

      {/* footer space */}
      <div className="h-24" />
    </div>
  );
}
