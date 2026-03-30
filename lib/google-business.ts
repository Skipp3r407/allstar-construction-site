/**
 * Google Business Profile helpers (public Place ID — safe to expose in NEXT_PUBLIC_*).
 * Reviews are always left on Google; we only link out or optionally display API data.
 */

export function getGooglePlaceId(): string | undefined {
  const id = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID?.trim();
  return id || undefined;
}

/** Opens Google’s write-review flow for this business. */
export function getGoogleWriteReviewUrl(): string | null {
  const id = getGooglePlaceId();
  if (!id) return null;
  return `https://search.google.com/local/writereview?placeid=${encodeURIComponent(id)}`;
}

/** Opens the Maps listing (reviews tab) for this place. */
export function getGoogleMapsPlaceUrl(): string | null {
  const id = getGooglePlaceId();
  if (!id) return null;
  return `https://www.google.com/maps/search/?api=1&query=Google&query_place_id=${encodeURIComponent(id)}`;
}
