import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getParticipant } from "@/lib/fest/db";
import ParticipantCard from "@/components/fest/participant-card";

export const dynamic = "force-dynamic";

type PageProps = {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;
    const participant = await getParticipant(id);

    if (!participant) {
        return { title: "Participant Not Found | Vemanothsav 2026" };
    }

    return {
        title: `${participant.name} — Entry Pass | Vemanothsav 2026`,
        description: `Entry verification for ${participant.name} at Vemanothsav 2026.`,
    };
}

export default async function ParticipantPage({ params, searchParams }: PageProps) {
    const { id } = await params;
    const resolvedSearchParams = await searchParams;

    // Validate UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
        notFound();
    }

    const participant = await getParticipant(id);

    if (!participant) {
        notFound();
    }

    const isCoordinatorMode = resolvedSearchParams.mode === "scan";

    // Strip large base64 ID card data for participant view to keep page fast
    const participantData = isCoordinatorMode
        ? participant
        : { ...participant, idCardUrl: participant.idCardUrl ? "[uploaded]" : null };

    return (
        <div className="relative min-h-screen">
            {/* Background */}
            <div className="pointer-events-none fixed inset-0">
                <div
                    style={{
                        backgroundImage: "url('/background.png')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                    className="min-h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-800 to-[#1c1c1d]"
                />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 md:py-20">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-bold text-white">
                        {isCoordinatorMode ? "🛂 Entry Verification" : "Entry Pass"}
                    </h1>
                    <p className="mt-1 text-sm text-white/50">
                        Vemanothsav 2026
                    </p>
                </div>

                <ParticipantCard
                    participant={participantData}
                    isCoordinatorMode={isCoordinatorMode}
                />
            </div>
        </div>
    );
}
