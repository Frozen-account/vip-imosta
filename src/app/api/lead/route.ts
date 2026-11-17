import { NextResponse } from "next/server";

/**
 * Consultation form endpoint.
 * Receives: name, contact, company, page, utm_source, utm_medium, utm_campaign, utm_content, utm_term,
 * and a "website" honeypot field (non-empty = bot).
 */
export async function POST(request: Request) {
  let body: Record<string, unknown> = {};
  try {
    body = await request.json();
  } catch {
    // Malformed body: still acknowledge, nothing to forward.
  }

  if (typeof body.website === "string" && body.website.trim()) {
    return NextResponse.json({ ok: true }); // honeypot hit
  }

  // TODO: Admin — connect CRM / webhook here (forward `body` to the lead destination).

  return NextResponse.json({ ok: true });
}
