import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import * as schema from "./schema";

/** Drizzle client over Vercel Postgres (Neon). Requires POSTGRES_URL env. */
export const db = drizzle(sql, { schema });

/** True when a Postgres connection string is configured. */
export const hasDb = Boolean(
  process.env.POSTGRES_URL || process.env.DATABASE_URL
);
