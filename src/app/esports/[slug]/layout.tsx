import type React from "react";
import type { Metadata } from "next";
import { Rajdhani } from "next/font/google";
import { SplashScreen } from "@/components/splash-screen";
import { Suspense } from "react";

const inter = Rajdhani({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "LAST ROUND 2026 | College Esports Championship",
  description:
    "Join the ultimate college esports championship powered by Samsung",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={inter.className} suppressHydrationWarning>
      <Suspense fallback={<SplashScreen />}>{children}</Suspense>
    </div>
  );
}
