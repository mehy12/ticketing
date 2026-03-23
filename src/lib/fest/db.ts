import db from "@/index";
import { participants, type NewParticipant, type Participant } from "./schema";
import { eq, desc, count, and, sql } from "drizzle-orm";

// ─── Insert ─────────────────────────────────────────────────────────────────

export async function insertParticipant(
    data: Omit<NewParticipant, "id" | "createdAt" | "entryChecked" | "entryTime" | "checkedInBy">
): Promise<Participant> {
    const [row] = await db.insert(participants).values(data).returning();
    return row;
}

// ─── Read ───────────────────────────────────────────────────────────────────

export async function getParticipant(id: string): Promise<Participant | null> {
    const [row] = await db
        .select()
        .from(participants)
        .where(eq(participants.id, id))
        .limit(1);
    return row ?? null;
}

// ─── Check-in ───────────────────────────────────────────────────────────────

export async function checkInParticipant(
    id: string,
    coordinatorName: string
): Promise<Participant | null> {
    const [row] = await db
        .update(participants)
        .set({
            entryChecked: true,
            entryTime: new Date(),
            checkedInBy: coordinatorName,
        })
        .where(and(eq(participants.id, id), eq(participants.entryChecked, false)))
        .returning();
    return row ?? null;
}

// ─── Admin Stats ────────────────────────────────────────────────────────────

export type AdminStats = {
    total: number;
    checkedIn: number;
    notCheckedIn: number;
    internal: number;
    external: number;
    recentCheckIns: Participant[];
};

export async function getAdminStats(): Promise<AdminStats> {
    const [totalResult] = await db
        .select({ value: count() })
        .from(participants);

    const [checkedInResult] = await db
        .select({ value: count() })
        .from(participants)
        .where(eq(participants.entryChecked, true));

    const [internalResult] = await db
        .select({ value: count() })
        .from(participants)
        .where(eq(participants.type, "internal"));

    const [externalResult] = await db
        .select({ value: count() })
        .from(participants)
        .where(eq(participants.type, "external"));

    const recentCheckIns = await db
        .select()
        .from(participants)
        .where(eq(participants.entryChecked, true))
        .orderBy(desc(participants.entryTime))
        .limit(20);

    const total = totalResult.value;
    const checkedIn = checkedInResult.value;

    return {
        total,
        checkedIn,
        notCheckedIn: total - checkedIn,
        internal: internalResult.value,
        external: externalResult.value,
        recentCheckIns,
    };
}
