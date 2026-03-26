import { NextRequest, NextResponse } from "next/server";
import { getParticipant, checkInParticipant } from "@/lib/fest/db";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, coordinatorName, source } = body;

        if (!id || !coordinatorName || !source) {
            return NextResponse.json(
                { error: "Missing required fields: id, coordinatorName, source" },
                { status: 400 }
            );
        }

        // Validate UUID format
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(id)) {
            return NextResponse.json(
                { error: "Invalid participant ID format" },
                { status: 400 }
            );
        }

        if (coordinatorName.trim().length < 2) {
            return NextResponse.json(
                { error: "Coordinator name must be at least 2 characters" },
                { status: 400 }
            );
        }

        // Check participant exists
        const existing = await getParticipant(id);
        if (!existing) {
            return NextResponse.json(
                { error: "Participant not found" },
                { status: 404 }
            );
        }

        // Validate participant is allowed entry
        if (existing.type === "external" && !existing.paid) {
            return NextResponse.json(
                { error: "External participant has not paid. Entry denied." },
                { status: 403 }
            );
        }

        // Prevent duplicate check-in
        if (existing.entryChecked) {
            return NextResponse.json(
                {
                    error: "Participant already checked in",
                    checkedInBy: existing.checkedInBy,
                    entryTime: existing.entryTime,
                },
                { status: 409 }
            );
        }

        // Perform check-in (atomic — WHERE entry_checked = false)
        const updated = await checkInParticipant(id, coordinatorName.trim(), source);

        if (!updated) {
            // Race condition: someone else checked them in between our read and update
            return NextResponse.json(
                { error: "Participant was already checked in by another coordinator" },
                { status: 409 }
            );
        }

        return NextResponse.json(updated);
    } catch (error) {
        console.error("[fest/api/checkin] Error:", error);
        return NextResponse.json(
            { error: "Check-in failed. Please try again." },
            { status: 500 }
        );
    }
}
