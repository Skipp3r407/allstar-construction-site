/**
 * Rule-based matching for the chatbot: normalize text, score FAQ keywords,
 * detect lead intent. No external AI.
 */
import type { ChatbotFaq } from "./chatbot-types";
import { LEAD_INTENT_PHRASES } from "./chatbot-types";

/** Lowercase, strip punctuation, collapse whitespace — for comparison only. */
export function normalizeUserText(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^\w\s@.]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Simple Levenshtein distance for short typo tolerance on a single token. */
function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  const row = Array.from({ length: n + 1 }, (_, i) => i);
  for (let i = 1; i <= m; i++) {
    let prev = i - 1;
    for (let j = 1; j <= n; j++) {
      const cur =
        a[i - 1] === b[j - 1]
          ? prev
          : 1 + Math.min(prev, row[j], row[j - 1]);
      prev = row[j];
      row[j] = cur;
    }
  }
  return row[n]!;
}

/** True if any token in message is within `maxDist` of the keyword (short words only). */
function fuzzyKeywordHit(message: string, keyword: string, maxDist = 1): boolean {
  const kn = normalizeUserText(keyword);
  if (kn.length < 4) return false;
  const tokens = normalizeUserText(message).split(" ");
  for (const t of tokens) {
    if (t.length < 4) continue;
    if (Math.abs(t.length - kn.length) > maxDist) continue;
    if (levenshtein(t, kn) <= maxDist) return true;
  }
  return false;
}

export function scoreFaqMatch(message: string, faq: ChatbotFaq): number {
  const n = normalizeUserText(message);
  if (!n) return 0;
  let score = 0;

  for (const kw of faq.keywords) {
    const kn = normalizeUserText(kw);
    if (kn.length < 2) continue;
    if (n.includes(kn)) {
      score += kn.length >= 6 ? 6 : 4;
      continue;
    }
    if (fuzzyKeywordHit(n, kn, 1)) score += 2;
  }

  const qWords = normalizeUserText(faq.question)
    .split(" ")
    .filter((w) => w.length > 2);
  for (const w of qWords) {
    if (n.includes(w)) score += 1;
  }

  return score;
}

export function findBestFaq(
  message: string,
  faqs: readonly ChatbotFaq[],
  minScore = 4
): ChatbotFaq | null {
  let best: ChatbotFaq | null = null;
  let bestScore = 0;
  for (const faq of faqs) {
    const s = scoreFaqMatch(message, faq);
    if (s > bestScore) {
      bestScore = s;
      best = faq;
    }
  }
  if (best && bestScore >= minScore) return best;
  return null;
}

/** User message suggests they want a quote / call / pricing — start lead flow. */
export function wantsLeadCapture(message: string): boolean {
  const n = normalizeUserText(message);
  if (!n) return false;
  return LEAD_INTENT_PHRASES.some((p) => n.includes(p));
}

export const FALLBACK_REPLY =
  "I may not have that exact answer here, but I can help you request a quote or connect you directly with our team.";
