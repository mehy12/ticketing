import { festDb as dbNew } from "@/lib/db/fest";
import dbOld from "@/index";
import { participants, type NewParticipant, type Participant } from "./schema";
import { eq, desc, count, and, sql } from "drizzle-orm";

// ─── Insert ─────────────────────────────────────────────────────────────────

export async function insertParticipant(
    data: Omit<NewParticipant, "id" | "createdAt" | "entryChecked" | "entryTime" | "checkedInBy">
): Promise<Participant> {
    const [row] = await dbNew.insert(participants).values(data).returning();
    return row;
}

// ─── Read ───────────────────────────────────────────────────────────────────

export async function getParticipant(id: string): Promise<(Participant & { source: "new" | "old" }) | null> {
    // 1. Search New DB (Primary)
    let [row] = await dbNew
        .select()
        .from(participants)
        .where(eq(participants.id, id))
        .limit(1);
        
    if (row) return { ...row, source: "new" };

    // 2. Search Old DB (Fallback)
    [row] = await dbOld
        .select()
        .from(participants)
        .where(eq(participants.id, id))
        .limit(1);

    if (row) return { ...row, source: "old" };

    return null;
}

export async function getParticipantByUsn(usn: string | null): Promise<(Participant & { source: "new" | "old" }) | null> {
    if (!usn) return null;
    const formattedUsn = usn.trim().toUpperCase();
    if (!formattedUsn) return null;

    // 1. Search New DB
    try {
        const [row] = await dbNew
            .select({ id: participants.id })
            .from(participants)
            .where(eq(participants.usn, formattedUsn))
            .limit(1);
        if (row) return { ...row, source: "new" } as any;
    } catch (err) {
        console.error("New DB USN lookup failed:", err);
    }

    // 2. Search Old DB (Resilient lookup)
    try {
        const [row] = await dbOld
            .select({ id: participants.id })
            .from(participants)
            .where(eq(participants.usn, formattedUsn))
            .limit(1);
        if (row) return { ...row, source: "old" } as any;
    } catch (err) {
        console.warn("Old DB USN lookup failed (likely schema mismatch):", err);
    }

    return null;
}

// ─── Check-in ───────────────────────────────────────────────────────────────

export async function checkInParticipant(
    id: string,
    coordinatorName: string,
    source: "new" | "old"
): Promise<Participant | null> {
    const targetDb = source === "new" ? dbNew : dbOld;

    const [row] = await targetDb
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
    const [totalResult] = await dbNew
        .select({ value: count() })
        .from(participants);

    const [checkedInResult] = await dbNew
        .select({ value: count() })
        .from(participants)
        .where(eq(participants.entryChecked, true));

    const [internalResult] = await dbNew
        .select({ value: count() })
        .from(participants)
        .where(eq(participants.type, "internal"));

    const [externalResult] = await dbNew
        .select({ value: count() })
        .from(participants)
        .where(eq(participants.type, "external"));

    const recentCheckIns = await dbNew
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

export async function getAllParticipants(): Promise<Participant[]> {
    return await dbNew
        .select()
        .from(participants)
        .orderBy(desc(participants.createdAt));
}

