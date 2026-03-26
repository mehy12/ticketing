import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crew",
  description:
    "Meet the extended crew of Vemanothsav 2026. The volunteers and organizers who bring Ikyam 2026 to life.",
  openGraph: {
    title: "Crew | Vemanothsav 2026",
    description:
      "The extended crew of Vemanothsav 2026 working behind the scenes.",
    url: "https://vemanothsav.in/team2",
  },
};

export default function Team2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
