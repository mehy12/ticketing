import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sponsors",
  description:
    "Meet the sponsors powering Vemanothsav 2026. Platinum, Gold, and Silver partners making Ikyam 2026 possible. Interested in sponsoring? Get in touch.",
  openGraph: {
    title: "Sponsors | Vemanothsav 2026",
    description:
      "The incredible partners making Ikyam 2026 possible — powering creativity, culture, and community.",
    url: "https://vemanothsav.in/sponsors",
  },
};

export default function SponsorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
