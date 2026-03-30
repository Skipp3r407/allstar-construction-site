import { company } from "@/lib/site-data";

const GOLD = "#d4a017";

// When the Google Business profile is live, replace this with the real “write a review” URL, e.g.
// https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID
// Or set NEXT_PUBLIC_GOOGLE_REVIEW_URL in .env.local and read it here instead.
const GOOGLE_REVIEW_URL =
  process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL?.trim() || "https://www.google.com";

function FiveStarHint() {
  const d = "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z";
  return (
    <div className="flex justify-center gap-2" aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width={28} height={28} viewBox="0 0 24 24" className="shrink-0">
          <path fill={GOLD} fillOpacity={0.85} d={d} />
        </svg>
      ))}
    </div>
  );
}

/**
 * Encourages first Google reviews — no live API or empty feed.
 * Place near testimonials or before a closing CTA.
 */
export function GoogleReviewCta() {
  return (
    <section className="section-pad bg-[#f9fafb]">
      <div className="container-main">
        <div className="relative mx-auto max-w-3xl overflow-hidden rounded-2xl border border-[#d4a017]/25 bg-gradient-to-b from-[#111827] via-[#1a2332] to-[#111827] px-6 py-10 text-center shadow-[0_24px_60px_-24px_rgba(17,24,39,0.45)] ring-1 ring-white/[0.06] sm:px-10 sm:py-12">
          <div
            className="pointer-events-none absolute -left-20 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-[#d4a017]/[0.07] blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-16 -top-20 h-44 w-44 rounded-full bg-[#d4a017]/10 blur-3xl"
            aria-hidden
          />

          <div className="relative">
            <FiveStarHint />
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#d4a017]">Google reviews</p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Be the First to Leave a Review
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-300">
              If we&apos;ve worked on your project, we&apos;d appreciate your feedback. Your review helps{" "}
              {company.name} grow and helps future customers feel confident choosing us.
            </p>

            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <a
                href={GOOGLE_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary min-h-[48px] justify-center px-6 py-3 text-center shadow-lg shadow-[#d4a017]/25 sm:min-w-[220px]"
              >
                Leave a Google Review
              </a>
              <a
                href={company.phoneLink}
                className="btn-secondary inline-flex min-h-[48px] items-center justify-center border-white bg-white px-6 py-3 !text-[#111827] shadow-sm hover:bg-[#f3f4f6] sm:min-w-[200px]"
              >
                Call {company.phone}
              </a>
            </div>

            <p className="mx-auto mt-8 max-w-lg text-sm leading-relaxed text-gray-400">
              Proudly serving Central Florida with{" "}
              <span className="whitespace-nowrap">
                {company.yearsEstablished.replace(/\s*years?/i, "").trim()}+ years in business
              </span>{" "}
              and {company.ownerExperience} of industry experience.
            </p>

            <p className="mt-5 text-xs leading-snug text-gray-500">
              Review link can be connected once the Google Business profile is fully ready.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
