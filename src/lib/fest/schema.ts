import {
    pgTable,
    text,
    timestamp,
    boolean,
    uuid,
    index,
} from "drizzle-orm/pg-core";

export const participants = pgTable(
    "participants",
    {
        id: uuid("id").primaryKey().defaultRandom(),
        name: text("name").notNull(),
        email: text("email").notNull(),
        phone: text("phone").notNull(),
        college: text("college").notNull(),
        type: text("type", { enum: ["internal", "external"] }).notNull(),
        usn: text("usn"),
        department: text("department"),
        events: text("events").array(),
        paid: boolean("paid").default(false).notNull(),
        entryChecked: boolean("entry_checked").default(false).notNull(),
        entryTime: timestamp("entry_time"),
        checkedInBy: text("checked_in_by"),
        idCardUrl: text("id_card_url"),
        createdAt: timestamp("created_at").defaultNow().notNull(),
    },
    (table) => [
        index("participants_email_idx").on(table.email),
        index("participants_type_idx").on(table.type),
    ]
);

export type Participant = typeof participants.$inferSelect;
export type NewParticipant = typeof participants.$inferInsert;
