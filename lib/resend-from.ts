const DEFAULT_RESEND_FROM = "onboarding@resend.dev";

function isPlainEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());
}

/**
 * Normalizes sender for Resend `from`:
 * - Plain email: `onboarding@resend.dev`
 * - Display + email: `All-Star Custom Construction <onboarding@resend.dev>`
 * Strips common .env quoting mistakes and trims angle-bracket addresses.
 */
export function resolveResendFrom(raw: string | undefined): string {
  let s = (raw ?? "").trim();
  if (s.length >= 2 && ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'")))) {
    s = s.slice(1, -1).trim();
  }
  if (!s) return DEFAULT_RESEND_FROM;

  const bracket = s.match(/^(.*?)\s*<\s*([^>]+?)\s*>$/);
  if (bracket) {
    const display = bracket[1].trim();
    const addr = bracket[2].trim();
    if (!isPlainEmail(addr)) return DEFAULT_RESEND_FROM;
    if (!display) return addr;
    return `${display} <${addr}>`;
  }

  if (isPlainEmail(s)) return s.trim();
  return DEFAULT_RESEND_FROM;
}

export const RESEND_DEFAULT_FROM = DEFAULT_RESEND_FROM;
