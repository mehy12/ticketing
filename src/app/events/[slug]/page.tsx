// This is a Server Component
import { notFound } from "next/navigation";
import { evento } from "@/exports/export";
import EventPageClient from "./event-client-page";
import type { Event } from "@/lib/types";
import type { Metadata } from "next";

// Expanded dummy data
const events: Event[] = evento;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);
  if (!event) return {};
  return {
    title: `${event.name || event.slug} | Vemanothsav 2026`,
    description:
      event.description ||
      `Details and registration for ${event.name || event.slug} at Vemanothsav 2026.`,
    openGraph: {
      title: `${event.name || event.slug} | Vemanothsav 2026`,
      description:
        event.description ||
        `Join ${event.name || event.slug} at Ikyam 2026.`,
      url: `https://vemanothsav.in/events/${slug}`,
    },
  };
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Await the params promise to get the slug
  const { slug } = await params;

  // Find the event data
  const event = events.find((e) => e.slug === slug);

  // Handle 404 if event not found
  if (!event) return notFound();

  // Pass the event data to the client component
  return <EventPageClient event={event} />;
}
