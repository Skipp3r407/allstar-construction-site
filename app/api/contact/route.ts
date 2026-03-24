import { Resend } from "resend";

const MAX_LEN = {
  name: 200,
  email: 320,
  phone: 40,
  service: 120,
  message: 8000,
};

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

/**
 * POST /api/contact — sends inquiry email via Resend (server-only).
 */
export async function POST(request: Request) {
  console.log("[api/contact] Request received");

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  const to = process.env.PROJECT_INQUIRY_TO_EMAIL;

  if (!apiKey || !from || !to) {
    console.error("[api/contact] Missing env: RESEND_API_KEY, EMAIL_FROM, or PROJECT_INQUIRY_TO_EMAIL");
    return Response.json(
      { ok: false, error: "Email is not configured. Please try again later or call us directly." },
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
  };

  const subject = `Website inquiry — ${name.replace(/\s+/g, " ").slice(0, 120)} (${service.slice(0, 80)})`;

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
  </table>
  <h3 style="margin: 24px 0 8px; font-size: 15px;">Message</h3>
  <div style="padding: 12px; background: #f9fafb; border-radius: 8px; border: 1px solid #e5e7eb;">${safe.message}</div>
</body>
</html>
`.trim();

  const resend = new Resend(apiKey);

  try {
    const result = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject,
      html,
    });

    console.log("[api/contact] Resend response:", JSON.stringify(result, null, 2));

    if (result.error) {
      console.error("[api/contact] Resend error object:", result.error);
      return Response.json(
        { ok: false, error: "Could not send your message. Please try again or call us." },
        { status: 502 }
      );
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("[api/contact] Resend send failed:", err);
    return Response.json(
      { ok: false, error: "Could not send your message. Please try again or call us directly." },
      { status: 502 }
    );
  }
}
