import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Vemanothsav 2026 - The Grand Cultural Fest",
  description:
    "Join us for Vemanothsav 2026, the ultimate cultural festival celebrating 25 years of talent, music, dance, and entertainment at Vemana Institute of Technology, Bangalore.",
  keywords:
    "Vemanothsav 2026, cultural fest, Bangalore events, music, dance, competitions, Vemana Institute of Technology, college fest, Bigg Boss Kannada",
  openGraph: {
    title: "Vemanothsav 2026 - The Grand Cultural Fest",
    description:
      "Experience the magic of Vemanothsav 2026, featuring music, dance, fashion, drama, and exclusive collaborations with Bigg Boss Kannada.",
    url: "https://vemanothsav.in",
    siteName: "Vemanothsav 2026",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Vemanothsav 2026 Team" />
        <meta property="og:locale" content="en_US" />
        <meta name="theme-color" content="#FFD700" />
        <link rel="canonical" href="https://vemanothsav.in" />
      </head>
      <body className={`${outfit.className}  antialiased`}>{children}</body>
    </html>
  );
}
