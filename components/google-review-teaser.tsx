import { getGoogleMapsPlaceUrl, getGoogleWriteReviewUrl } from "@/lib/google-business";

/** Compact CTA row for the homepage when Google Place ID is configured. */
export function GoogleReviewTeaser() {
  const writeUrl = getGoogleWriteReviewUrl();
  const mapsUrl = getGoogleMapsPlaceUrl();
  if (!writeUrl && !mapsUrl) return null;

  return (
    <div className="mt-8 flex flex-col gap-3 rounded-xl border border-[#d4a017]/25 bg-[#fffbeb] px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm font-medium text-[#78350f]">
        Happy with our work? Leave a review on Google — it helps local homeowners find us.
      </p>
      <div className="flex flex-shrink-0 flex-wrap gap-2">
        {writeUrl ? (
          <a
            href={writeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary px-4 py-2.5 text-center text-sm"
          >
            Leave a Google review
          </a>
        ) : null}
        {mapsUrl ? (
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary px-4 py-2.5 text-center text-sm"
          >
            See us on Google
          </a>
        ) : null}
      </div>
    </div>
  );
}
