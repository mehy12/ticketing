import type { Metadata } from "next";
import PassesPage from "@/components/passes-page";

export const metadata: Metadata = {
  title: "Passes",
  description:
    "Get your passes for Vemanothsav 2026. Choose from various pass options to access the best cultural events, concerts, and competitions at Vemana Institute of Technology.",
  openGraph: {
    title: "Passes | Vemanothsav 2026",
    description:
      "Get your passes for Vemanothsav 2026 — access all cultural events, concerts, and competitions.",
    url: "https://vemanothsav.in/passes",
  },
};

export default function Page() {
  return <PassesPage />;
}
