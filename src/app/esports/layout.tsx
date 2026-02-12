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
    "Join the ultimate college esports championship powered by Samsung",
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
