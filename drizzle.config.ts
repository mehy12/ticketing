import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    out: './drizzle',
    schema: ['./src/lib/fest/schema.ts'],
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.FEST_DATABASE_URL!,
    },
});
