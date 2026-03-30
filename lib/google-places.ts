/**
 * Optional server-side fetch of Google Places “details” (rating + up to 5 review snippets).
 * Requires GOOGLE_PLACES_API_KEY (server) + NEXT_PUBLIC_GOOGLE_PLACE_ID.
 * Enable “Places API” in Google Cloud and billing on the project.
 */

export type GoogleReviewSnippet = {
  authorName: string;
  rating: number;
  text: string;
  relativeTime: string;
  profilePhotoUrl?: string;
};

export type GooglePlaceReviewData = {
  name: string;
  rating: number;
  userRatingsTotal: number;
  googleMapsUrl: string;
  reviews: GoogleReviewSnippet[];
};

export async function fetchGooglePlaceReviews(): Promise<GooglePlaceReviewData | null> {
  const placeId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID?.trim();
  const key = process.env.GOOGLE_PLACES_API_KEY?.trim();

  if (!placeId || !key) {
    return null;
  }

  const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
  url.searchParams.set("place_id", placeId);
  url.searchParams.set("fields", "name,rating,user_ratings_total,reviews,url");
  url.searchParams.set("key", key);

  try {
    const res = await fetch(url.toString(), {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.error("[google-places] HTTP error:", res.status, await res.text());
      return null;
    }

    const data = (await res.json()) as {
      status: string;
      error_message?: string;
      result?: {
        name?: string;
        rating?: number;
        user_ratings_total?: number;
        url?: string;
        reviews?: Array<{
          author_name: string;
          rating: number;
          text: string;
          relative_time_description: string;
          profile_photo_url?: string;
        }>;
      };
    };

    console.log("[google-places] API status:", data.status);

    if (data.status !== "OK" || !data.result) {
      console.error("[google-places] Place Details failed:", data.status, data.error_message);
      return null;
    }

    const r = data.result;
    const reviews: GoogleReviewSnippet[] = (r.reviews ?? []).slice(0, 5).map((rev) => ({
      authorName: rev.author_name,
      rating: rev.rating,
      text: rev.text,
      relativeTime: rev.relative_time_description,
      profilePhotoUrl: rev.profile_photo_url,
    }));

    return {
      name: r.name ?? "Google",
      rating: r.rating ?? 0,
      userRatingsTotal: r.user_ratings_total ?? 0,
      googleMapsUrl: r.url ?? "",
      reviews,
    };
  } catch (e) {
    console.error("[google-places] Fetch error:", e);
    return null;
  }
}
