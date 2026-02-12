"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { titleToSlug } from "@/lib/utils";
import { Calendar, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export interface Event {
  title: string;
  image: string;
  description: string;
  isPublished: boolean;
}

export function EventCard({
  event,
  index,
}: {
  event: Event;
  index: number;
}) {
  const gradients = [
    "from-purple-500 to-indigo-600",
    "from-blue-500 to-teal-400",
    "from-green-500 to-emerald-600",
    "from-yellow-500 to-orange-500",
    "from-pink-500 to-rose-500",
    "from-indigo-500 to-purple-600",
    "from-teal-500 to-cyan-400",
    "from-orange-500 to-red-500",
    "from-rose-500 to-pink-600",
    "from-emerald-500 to-green-600",
    "from-cyan-500 to-blue-600",
    "from-red-500 to-orange-600",
  ];

  const gradient = gradients[index % gradients.length];

  return (
    <Link
      href={`/events/${titleToSlug(event.title)}`}
      className="block h-full"
    >
      <Card className="overflow-hidden aspect-[1/1.414] flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 bg-black/40 backdrop-blur-sm border-gray-800 group">

        {/* Image Section */}
        <div className="relative h-[55%] w-full overflow-hidden">

          <div
            className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${gradient} z-20`}
          />

          <Image
            src={event.image || "/placeholder.svg"}
            fill
            alt={event.title}
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />

          <Badge
            className={`absolute top-3 right-3 z-20 bg-gradient-to-r ${gradient}`}
          >
            Ekyam 2026
          </Badge>
        </div>

        {/* Content Section */}
        <div className="flex flex-col justify-between h-[45%] p-4">

          <div>
            <CardTitle className="text-xl font-bold text-white mb-2">
              {event.title}
            </CardTitle>

            <CardDescription className="flex items-center gap-1 text-gray-300 mb-2">
              <Calendar className="h-3 w-3" />
              <span>27 March 2026</span>
            </CardDescription>

            <div className="flex items-center gap-1 text-xs text-gray-400 mb-2">
              <Clock className="h-3 w-3" />
              <span>Check event page for timing</span>
              <span className="mx-1">•</span>
              <MapPin className="h-3 w-3" />
              <span>Vemana Institute of Technology</span>
            </div>

            <p className="text-sm text-gray-300 line-clamp-3">
              {event.description}
            </p>
          </div>

          {/* Footer */}
          <div className="pt-3 border-t border-gray-800 flex justify-between items-center">
            <span className="text-xs text-gray-400">
              Online Registration
            </span>

            <span
              className={`text-xs font-semibold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
            >
              Learn more →
            </span>
          </div>

        </div>
      </Card>
    </Link>
  );
}
