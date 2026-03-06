import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
  description:
    "Register for Vemanothsav 2026 events and competitions. Sign up with Google, pick your events, and pay securely to confirm your spot at Ikyam 2026.",
  openGraph: {
    title: "Register | Vemanothsav 2026",
    description:
      "Register for Ikyam 2026 events and competitions at Vemana Institute of Technology.",
    url: "https://vemanothsav.in/register",
  },
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
