import { NextRequest, NextResponse } from "next/server";
import { getParticipant } from "@/lib/fest/db";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json(
                { error: "Missing required parameter: id" },
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

        const participant = await getParticipant(id);

        if (!participant) {
            return NextResponse.json(
                { error: "Participant not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(participant);
    } catch (error) {
        console.error("[fest/api/getParticipant] Error:", error);
        return NextResponse.json(
            { error: "Failed to fetch participant" },
            { status: 500 }
        );
    }
}
