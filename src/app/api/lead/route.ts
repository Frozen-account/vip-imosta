import { NextResponse } from "next/server";

const MAX_LEN = 600;

const clean = (v: unknown) => (typeof v === "string" ? v.trim().slice(0, MAX_LEN) : "");

const escapeHtml = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields. Pretend success.
  if (clean(body.website)) return NextResponse.json({ ok: true });

  const lead = {
    name: clean(body.name),
    contact: clean(body.contact),
    company: clean(body.company),
    package: clean(body.package),
    page: clean(body.page),
    utm_source: clean(body.utm_source),
    utm_medium: clean(body.utm_medium),
    utm_campaign: clean(body.utm_campaign),
    utm_content: clean(body.utm_content),
    utm_term: clean(body.utm_term),
  };

  if (lead.name.length < 2 || lead.contact.length < 5) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 422 });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    // Not configured yet: keep the lead in server logs so it is not lost.
    console.warn("[lead] TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID not set. Lead:", JSON.stringify(lead));
    return NextResponse.json({ ok: true, delivered: false });
  }

  const utm = [lead.utm_source, lead.utm_medium, lead.utm_campaign, lead.utm_content, lead.utm_term]
    .map((v) => v || "—")
    .join(" / ");

  const text = [
    "<b>🔴 VIP &amp; CFO — новая заявка</b>",
    `<b>Тип:</b> Spolka · Экспресс-аудит 1 200 PLN`,
    `<b>Имя:</b> ${escapeHtml(lead.name)}`,
    `<b>Контакт:</b> ${escapeHtml(lead.contact)}`,
    `<b>NIP / оборот:</b> ${escapeHtml(lead.company || "—")}`,
    lead.package ? `<b>Калькулятор:</b> ${escapeHtml(lead.package)}` : "",
    `<b>UTM (source/medium/campaign/content/term):</b> ${escapeHtml(utm)}`,
    lead.page ? `<b>Страница:</b> ${escapeHtml(lead.page)}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML", disable_web_page_preview: true }),
    });
    if (!res.ok) {
      console.error("[lead] Telegram error", res.status, await res.text(), JSON.stringify(lead));
      return NextResponse.json({ ok: false, error: "delivery" }, { status: 502 });
    }
  } catch (err) {
    console.error("[lead] Telegram request failed", err, JSON.stringify(lead));
    return NextResponse.json({ ok: false, error: "delivery" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, delivered: true });
}
