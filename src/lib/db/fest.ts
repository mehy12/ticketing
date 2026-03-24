import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const sql = neon(process.env.FEST_DATABASE_URL!);
export const festDb = drizzle({ client: sql });
