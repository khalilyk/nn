/**
 * Idempotent, additive migration: creates the passkeys table only if absent.
 * Run: POSTGRES_URL=... npx tsx scripts/migrate-passkeys.ts
 */
import { sql } from "@vercel/postgres";

async function main() {
  await sql.query(`
    CREATE TABLE IF NOT EXISTS passkeys (
      id serial PRIMARY KEY,
      credential_id text NOT NULL UNIQUE,
      public_key text NOT NULL,
      counter integer DEFAULT 0 NOT NULL,
      transports text,
      label text DEFAULT 'Passkey' NOT NULL,
      created_at timestamp DEFAULT now() NOT NULL
    );
  `);
  console.log("✓ passkeys table ready");
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });
