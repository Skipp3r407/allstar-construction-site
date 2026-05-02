import { Resend } from "resend";
import { resolveResendFrom } from "@/lib/resend-from";

const MAX_LEN = {
  name: 200,
  email: 320,
  phone: 40,
  service: 120,
  message: 8000,
  source: 48,
};

/** Optional attribution for analytics / prioritization (e.g. chat assistant). */
const ALLOWED_SOURCES = new Set(["contact", "chatbot-chat", "chatbot-form"]);

const DEFAULT_INQUIRY_TO = "allstarconstruction85@gmail.com";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

function resolveInquiryTo(raw: string | undefined): string {
  const t = raw?.trim();
  return t && t.length > 0 ? t : DEFAULT_INQUIRY_TO;
}

/** Safe client-facing copy; keeps Resend validation hints without dumping stack traces. */
function formatSendFailureMessage(resendMessage: string | undefined): string {
  const base = "We couldn't send your message right now.";
  if (!resendMessage?.trim()) {
    return `${base} Please try again in a moment or call us directly.`;
  }
  const clipped = resendMessage.trim().slice(0, 280);
  return `${base} (${clipped}) If this keeps happening, please call us.`;
}

/**
 * POST /api/contact — sends inquiry email via Resend (server-only).
 */
export async function POST(request: Request) {
  console.log("[api/contact] Request received");

  const apiKey = process.env.RESEND_API_KEY;
  const fromRaw = process.env.EMAIL_FROM;
  const from = resolveResendFrom(fromRaw);
  const to = resolveInquiryTo(process.env.PROJECT_INQUIRY_TO_EMAIL);

  console.log("[api/contact] EMAIL_FROM env:", fromRaw?.trim() ? "set" : "unset");
  console.log("[api/contact] resolved `from` for Resend:", from);
  console.log("[api/contact] PROJECT_INQUIRY_TO_EMAIL env:", process.env.PROJECT_INQUIRY_TO_EMAIL?.trim() ? "set" : "unset");
  console.log("[api/contact] resolved `to`:", to);

  if (!apiKey) {
    console.error("[api/contact] Missing env: RESEND_API_KEY");
    return Response.json(
      {
        ok: false,
        error: "Email is not configured. Please try again later or call us directly.",
      },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    console.error("[api/contact] Invalid JSON body");
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const raw = body as Record<string, unknown>;
  const name = typeof raw.name === "string" ? raw.name.trim() : "";
  const email = typeof raw.email === "string" ? raw.email.trim() : "";
  const phone = typeof raw.phone === "string" ? raw.phone.trim() : "";
  const service = typeof raw.service === "string" ? raw.service.trim() : "";
  const message =
    typeof raw.message === "string"
      ? raw.message.trim()
      : typeof raw.details === "string"
        ? raw.details.trim()
        : "";

  const rawSource = typeof raw.source === "string" ? raw.source.trim() : "";
  const source =
    rawSource.length > 0 && ALLOWED_SOURCES.has(rawSource) && rawSource.length <= MAX_LEN.source
      ? rawSource
      : "contact";

  if (!isNonEmptyString(name) || name.length > MAX_LEN.name) {
    return Response.json({ ok: false, error: "Please enter your name." }, { status: 400 });
  }
  if (!isNonEmptyString(email) || email.length > MAX_LEN.email) {
    return Response.json({ ok: false, error: "Please enter a valid email." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ ok: false, error: "Please enter a valid email address." }, { status: 400 });
  }
  if (!isNonEmptyString(phone) || phone.length > MAX_LEN.phone) {
    return Response.json({ ok: false, error: "Please enter your phone number." }, { status: 400 });
  }
  if (!isNonEmptyString(service) || service.length > MAX_LEN.service) {
    return Response.json({ ok: false, error: "Please select a service." }, { status: 400 });
  }
  if (!isNonEmptyString(message) || message.length > MAX_LEN.message) {
    return Response.json({ ok: false, error: "Please describe your project." }, { status: 400 });
  }

  const safe = {
    name: escapeHtml(name),
    email: escapeHtml(email),
    phone: escapeHtml(phone),
    service: escapeHtml(service),
    message: escapeHtml(message).replace(/\n/g, "<br/>"),
    sourceLabel:
      source === "chatbot-chat"
        ? "Site chat (conversation)"
        : source === "chatbot-form"
          ? "Site chat (quick form)"
          : "Contact page",
  };

  const subjectPrefix =
    source === "chatbot-chat" || source === "chatbot-form"
      ? "Website inquiry — chat assistant — "
      : "Website inquiry — ";
  const subject = `${subjectPrefix}${name.replace(/\s+/g, " ").slice(0, 120)} (${service.slice(0, 80)})`;

  const html = `
<!DOCTYPE html>
<html>
<body style="font-family: system-ui, sans-serif; line-height: 1.5; color: #111827;">
  <h2 style="margin: 0 0 16px; font-size: 18px;">New contact form submission</h2>
  <table style="border-collapse: collapse; width: 100%; max-width: 560px;">
    <tr><td style="padding: 8px 0; font-weight: 600; width: 120px;">Name</td><td style="padding: 8px 0;">${safe.name}</td></tr>
    <tr><td style="padding: 8px 0; font-weight: 600;">Email</td><td style="padding: 8px 0;"><a href="mailto:${safe.email}">${safe.email}</a></td></tr>
    <tr><td style="padding: 8px 0; font-weight: 600;">Phone</td><td style="padding: 8px 0;">${safe.phone}</td></tr>
    <tr><td style="padding: 8px 0; font-weight: 600;">Service</td><td style="padding: 8px 0;">${safe.service}</td></tr>
    <tr><td style="padding: 8px 0; font-weight: 600;">Source</td><td style="padding: 8px 0;">${safe.sourceLabel}</td></tr>
  </table>
  <h3 style="margin: 24px 0 8px; font-size: 15px;">Message</h3>
  <div style="padding: 12px; background: #f9fafb; border-radius: 8px; border: 1px solid #e5e7eb;">${safe.message}</div>
</body>
</html>
`.trim();

  const resend = new Resend(apiKey);

  const sendPayload = {
    from,
    to: [to],
    replyTo: email,
    subject,
    html,
  };

  console.log("[api/contact] Resend send — from:", sendPayload.from, "| to:", sendPayload.to.join(", "));

  try {
    const result = await resend.emails.send(sendPayload);

    console.log("[api/contact] Resend response:", JSON.stringify(result, null, 2));

    if (result.error) {
      const errMsg =
        typeof result.error === "object" && result.error !== null && "message" in result.error
          ? String((result.error as { message: unknown }).message)
          : String(result.error);
      console.error("[api/contact] Resend error:", errMsg, result.error);
      return Response.json(
        { ok: false, error: formatSendFailureMessage(errMsg) },
        { status: 502 }
      );
    }

    return Response.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[api/contact] Resend send failed:", message, err);
    return Response.json(
      {
        ok: false,
        error: formatSendFailureMessage(message),
      },
      { status: 502 }
    );
  }
}
