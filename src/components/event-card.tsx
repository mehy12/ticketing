"use client";

import { titleToSlug } from "@/lib/utils";
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function formatEventDate(dateStr: string): string {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  return `${day} ${month}`;
}

export interface Event {
  title: string;
  image: string;
  description: string;
  isPublished: boolean;
  date?: string;
}

export function EventCard({
  event,
  index,
}: {
  event: Event;
  index: number;
}) {
  const accentColors = [
    "from-purple-500 to-indigo-500",
    "from-blue-500 to-cyan-400",
    "from-emerald-500 to-teal-400",
    "from-amber-500 to-orange-500",
    "from-pink-500 to-rose-500",
    "from-indigo-400 to-violet-500",
    "from-teal-400 to-emerald-500",
    "from-orange-500 to-red-500",
    "from-rose-400 to-pink-500",
    "from-cyan-400 to-blue-500",
    "from-violet-500 to-purple-500",
    "from-red-500 to-orange-400",
  ];

  const accent = accentColors[index % accentColors.length];

  return (
    <Link
      href={`/events/${titleToSlug(event.title)}`}
      className="block h-full group"
    >
      {/* Outer border container */}
      <div className="rounded-[32px] bg-neutral-900 border border-neutral-800 p-3 cursor-pointer transition-all duration-500 hover:border-neutral-700 hover:shadow-xl hover:shadow-black/40 h-full flex flex-col">
        {/* Inset image */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] flex-shrink-0">
          <Image
            src={event.image || "/placeholder.svg"}
            fill
            alt={event.title}
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {/* Subtle gradient at bottom of image */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
        </div>

        {/* Content section */}
        <div className="flex flex-col flex-1 px-2 pt-4 pb-1">
          {/* Title */}
          <h3 className="text-lg font-bold text-white tracking-wide leading-tight mb-1.5">
            {event.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-400 leading-relaxed line-clamp-2 mb-4">
            {event.description}
          </p>

          {/* Bottom bar */}
          <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/10">
            {/* Meta info */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <Calendar className="h-3.5 w-3.5" />
                <span>{event.date ? formatEventDate(event.date) : "TBA"}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <MapPin className="h-3.5 w-3.5" />
                <span>VIT</span>
              </div>
            </div>

            {/* Pill CTA button */}
            <div
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white text-black text-xs font-semibold transition-colors duration-300 group-hover:bg-gray-200"
            >
              <span>Explore</span>
              <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
