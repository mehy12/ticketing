import { NextRequest, NextResponse } from "next/server";
import { insertParticipant, getParticipantByUsn } from "@/lib/fest/db";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dmitw9qcc",
    api_key: "885428386916257",
    api_secret: "Z6KfjGx7tsaNcl6Qz7X27cJJEt0",
    secure: true,
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const { name, usn, department, email, phone, idCardUrl } = body;

        // Validate required fields
        if (!name || !email || !phone) {
            return NextResponse.json(
                { error: "Missing required fields: name, email, phone" },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Invalid email format" },
                { status: 400 }
            );
        }

        // Check for existing USN
        const existingParticipant = await getParticipantByUsn(usn);
        if (existingParticipant) {
            return NextResponse.json(
                { error: "This USN is already registered!" },
                { status: 400 }
            );
        }

        const participant = await insertParticipant({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            phone: phone.trim(),
            college: "Vemana Institute of Technology",
            type: usn?.trim() ? "internal" : "external",
            usn: usn?.trim().toUpperCase() || null,
            department: department?.trim() || null,
            paid: false,
            idCardUrl: idCardUrl || null,
        });

        return NextResponse.json({ id: participant.id }, { status: 201 });
    } catch (error: any) {
        console.error("[fest/api/register] CRITICAL ERROR:", error);
        return NextResponse.json(
            { error: `Registration failed: ${error.message || "Unknown database error"}` },
            { status: 500 }
        );
    }
}
