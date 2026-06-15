/**
 * Idempotent, additive migration: creates the invoicing/CRM tables only if absent.
 * Run: POSTGRES_URL=... npx tsx scripts/migrate-invoicing.ts
 */
import { sql } from "@vercel/postgres";

async function main() {
  await sql.query(`
    CREATE TABLE IF NOT EXISTS clients (
      id serial PRIMARY KEY,
      name text NOT NULL,
      company text DEFAULT '' NOT NULL,
      email text DEFAULT '' NOT NULL,
      phone text DEFAULT '' NOT NULL,
      address text DEFAULT '' NOT NULL,
      abn text DEFAULT '' NOT NULL,
      notes text DEFAULT '' NOT NULL,
      created_at timestamp DEFAULT now() NOT NULL
    );
  `);
  await sql.query(`
    CREATE TABLE IF NOT EXISTS invoices (
      id serial PRIMARY KEY,
      number text NOT NULL,
      doc_type text DEFAULT 'invoice' NOT NULL,
      status text DEFAULT 'draft' NOT NULL,
      client_id integer,
      client jsonb NOT NULL,
      subject text DEFAULT '' NOT NULL,
      issue_date text DEFAULT '' NOT NULL,
      due_date text DEFAULT '' NOT NULL,
      items jsonb NOT NULL,
      tax_rate double precision DEFAULT 0 NOT NULL,
      tax_label text DEFAULT 'GST 10%' NOT NULL,
      discount double precision DEFAULT 0 NOT NULL,
      currency text DEFAULT 'AUD' NOT NULL,
      notes text DEFAULT '' NOT NULL,
      is_template boolean DEFAULT false NOT NULL,
      recur_interval text,
      created_at timestamp DEFAULT now() NOT NULL,
      updated_at timestamp DEFAULT now() NOT NULL
    );
  `);
  await sql.query(`
    CREATE TABLE IF NOT EXISTS invoice_settings (
      id serial PRIMARY KEY,
      data jsonb NOT NULL,
      updated_at timestamp DEFAULT now() NOT NULL
    );
  `);
  await sql.query(`
    CREATE TABLE IF NOT EXISTS proposals (
      id serial PRIMARY KEY,
      title text DEFAULT 'Proposal' NOT NULL,
      kind text DEFAULT 'website' NOT NULL,
      client_tag text DEFAULT '' NOT NULL,
      client jsonb NOT NULL,
      slides jsonb NOT NULL,
      created_at timestamp DEFAULT now() NOT NULL,
      updated_at timestamp DEFAULT now() NOT NULL
    );
  `);
  console.log("✓ tables ensured (clients, invoices, invoice_settings, proposals)");
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });
