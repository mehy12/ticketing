import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Meet the team behind Vemanothsav 2026. Faculty coordinators, student committee members, developers, and designers making Ikyam 2026 happen.",
  openGraph: {
    title: "Team | Vemanothsav 2026",
    description:
      "The people behind Ikyam 2026 — dedicated faculty and students working together to create an unforgettable experience.",
    url: "https://vemanothsav.in/team",
  },
};

export default function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
