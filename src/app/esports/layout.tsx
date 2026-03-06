import type React from "react";
import type { Metadata } from "next";
import { Anton_SC, Rajdhani } from "next/font/google";
import { SplashScreen } from "@/components/splash-screen";
import { Suspense } from "react";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const anton = Anton_SC({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-anton",
});

export const metadata: Metadata = {
  title: "LastRound 2026 | College Esports Championship",
  description:
    "Compete in LastRound 2026, the ultimate inter-college esports championship featuring Valorant, BGMI, and more. ₹50,000 prize pool, 32 teams, 2 days of intense competition.",
  keywords:
    "LastRound 2026, esports, college esports, Valorant tournament, BGMI tournament, gaming competition, Vemana Institute, Vemanothsav",
  openGraph: {
    title: "LastRound 2026 | College Esports Championship",
    description:
      "The ultimate inter-college esports championship — ₹50,000 prize pool, 32 teams, 2 days of intense competition.",
    url: "https://vemanothsav.in/esports",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${rajdhani.className} bg-black text-white ${anton.variable}`}
    >
      <Suspense fallback={<SplashScreen />}>{children}</Suspense>
    </div>
  );
}
