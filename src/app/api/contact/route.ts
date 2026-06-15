import { Resend } from "resend";
import { db, hasDb } from "@/lib/db";
import { submissions, events } from "@/lib/db/schema";

export const runtime = "nodejs";

const TO = "hello@thisisnn.com";
// Sender must be on a domain verified in Resend. Until thisisnn.com is verified,
// Resend's shared onboarding@resend.dev works (only delivers to the account owner).
const FROM = process.env.CONTACT_FROM || "Not Normal <onboarding@resend.dev>";

export async function POST(request: Request) {
  try {
    const { name, email, message, coffee } = await request.json();

    if (!name || !email || !message) {
      return Response.json({ error: "Missing required fields." }, { status: 400 });
    }

    // Capture the submission first, so nothing is lost even if email fails.
    if (hasDb) {
      try {
        await db.insert(submissions).values({ name, email, message, coffee: coffee || null });
        await db.insert(events).values({ type: "contact_submit", label: name, path: "/" });
      } catch {
        /* non-fatal */
      }
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return Response.json({ error: "Email service not configured." }, { status: 500 });
    }

    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `New enquiry from ${name}`,
      text: `${message}\n\nCoffee order: ${coffee || "-"}\n\nName: ${name}\nEmail: ${email}`,
    });

    if (error) {
      return Response.json({ error: error.message || "Failed to send." }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }
}
