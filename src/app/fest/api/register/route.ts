import { NextRequest, NextResponse } from "next/server";
import { insertParticipant } from "@/lib/fest/db";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const { name, usn, department, email, phone, idCardUrl } = body;

        // Validate required fields
        if (!name || !usn || !department || !email || !phone) {
            return NextResponse.json(
                { error: "Missing required fields: name, usn, department, email, phone" },
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

        const participant = await insertParticipant({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            phone: phone.trim(),
            college: "Vemana Institute of Technology",
            type: "internal",
            usn: usn.trim().toUpperCase(),
            department: department.trim(),
            paid: false,
            idCardUrl: idCardUrl || null,
        });

        return NextResponse.json({ id: participant.id }, { status: 201 });
    } catch (error) {
        console.error("[fest/api/register] Error:", error);
        return NextResponse.json(
            { error: "Registration failed. Please try again." },
            { status: 500 }
        );
    }
}
