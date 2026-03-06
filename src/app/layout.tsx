import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { PageTransition } from "@/components/page-transition";

const outfit = Outfit({
  variable: "--font-outfit-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vemanothsav.in"),
  title: {
    default: "Vemanothsav 2026 - The Grand Cultural Fest",
    template: "%s | Vemanothsav 2026",
  },
  description:
    "Join us for Vemanothsav 2026, the ultimate cultural festival celebrating 25 years of talent, music, dance, and entertainment at Vemana Institute of Technology, Bangalore.",
  keywords:
    "Vemanothsav 2026, cultural fest, Bangalore events, music, dance, competitions, Vemana Institute of Technology, college fest, Bigg Boss Kannada, Ikyam 2026",
  authors: [{ name: "Vemanothsav 2026 Team" }],
  creator: "Vemanothsav 2026 Team",
  robots: { index: true, follow: true },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Vemanothsav 2026 - The Grand Cultural Fest",
    description:
      "Experience the magic of Vemanothsav 2026, featuring music, dance, fashion, drama, and exclusive collaborations with Bigg Boss Kannada.",
    url: "https://vemanothsav.in",
    siteName: "Vemanothsav 2026",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/banner.png",
        width: 1200,
        height: 630,
        alt: "Vemanothsav 2026 - The Grand Cultural Fest",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vemanothsav 2026 - The Grand Cultural Fest",
    description:
      "Join us for Vemanothsav 2026, the ultimate cultural festival at Vemana Institute of Technology, Bangalore.",
    images: ["/banner.png"],
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
        <meta name="theme-color" content="#FFD700" />
        <link rel="canonical" href="https://vemanothsav.in" />
      </head>
      <body className={`${outfit.className}  antialiased`}>
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
