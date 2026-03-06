import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Browse all Ikyam 2026 events — dance, music, drama, film, gaming, art, and brain challenges. Find your event and register at Vemanothsav 2026.",
  openGraph: {
    title: "Events | Vemanothsav 2026",
    description:
      "Explore all the exciting events at Ikyam 2026 — from dance and music to gaming and brain challenges.",
    url: "https://vemanothsav.in/events",
  },
};

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
