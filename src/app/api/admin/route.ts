import { NextRequest, NextResponse } from "next/server";
import { getAdminStats } from "@/lib/fest/db";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { password } = body;

        const adminPassword = process.env.FEST_ADMIN_PASSWORD;

        if (!adminPassword) {
            return NextResponse.json(
                { error: "Admin access is not configured" },
                { status: 503 }
            );
        }

        if (password !== adminPassword) {
            return NextResponse.json(
                { error: "Invalid password" },
                { status: 401 }
            );
        }

        const stats = await getAdminStats();
        return NextResponse.json(stats);
    } catch (error) {
        console.error("[fest/api/admin] Error:", error);
        return NextResponse.json(
            { error: "Failed to fetch admin data" },
            { status: 500 }
        );
    }
}
