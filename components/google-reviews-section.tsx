import Image from "next/image";
import { fetchGooglePlaceReviews } from "@/lib/google-places";
import { getGoogleMapsPlaceUrl, getGoogleWriteReviewUrl } from "@/lib/google-business";
import { GoogleStarRating } from "@/components/google-star-rating";

/**
 * Google reviews block: optional live snippets (Places API) + always-offered links to view / leave a review on Google.
 */
export async function GoogleReviewsSection() {
  const writeUrl = getGoogleWriteReviewUrl();
  const fallbackMapsUrl = getGoogleMapsPlaceUrl();
  const apiData = await fetchGooglePlaceReviews();

  const mapsUrl = apiData?.googleMapsUrl || fallbackMapsUrl || "";

  return (
    <section className="section-pad bg-white">
      <div className="container-main">
        <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-[#fafafa] to-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#d4a017]">
                Google
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#111827] sm:text-3xl">
                Reviews on Google
              </h2>
              <p className="mt-3 max-w-2xl text-sm text-[#4b5563]">
                New reviews are submitted on Google. Share your experience after a project — it helps
                other homeowners find trusted local contractors.
              </p>
            </div>

            <div className="flex flex-shrink-0 flex-col gap-3 sm:flex-row lg:flex-col">
              {writeUrl ? (
                <a
                  href={writeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex justify-center px-5 py-3 text-center text-sm"
                >
                  Leave a Google review
                </a>
              ) : null}
              {mapsUrl ? (
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary inline-flex justify-center px-5 py-3 text-center text-sm"
                >
                  View on Google Maps
                </a>
              ) : (
                <p className="max-w-xs text-xs text-[#6b7280]">
                  Add <code className="rounded bg-gray-100 px-1 py-0.5 text-[11px]">NEXT_PUBLIC_GOOGLE_PLACE_ID</code>{" "}
                  in your environment to enable review links.
                </p>
              )}
            </div>
          </div>

          {apiData && apiData.userRatingsTotal > 0 ? (
            <div className="mt-8 border-t border-gray-200 pt-8">
              <div className="flex flex-wrap items-center gap-3">
                <GoogleStarRating rating={apiData.rating} />
                <span className="text-lg font-bold text-[#111827]">{apiData.rating.toFixed(1)}</span>
                <span className="text-sm text-[#6b7280]">
                  Based on {apiData.userRatingsTotal.toLocaleString()} Google reviews
                </span>
              </div>

              {apiData.reviews.length > 0 ? (
                <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {apiData.reviews.map((rev, i) => (
                    <li
                      key={`${rev.authorName}-${i}`}
                      className="flex flex-col rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
                    >
                      <div className="flex items-start gap-3">
                        {rev.profilePhotoUrl ? (
                          <Image
                            src={rev.profilePhotoUrl}
                            alt=""
                            width={40}
                            height={40}
                            className="h-10 w-10 rounded-full object-cover"
                            unoptimized
                          />
                        ) : (
                          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1f2937] text-sm font-bold text-[#d4a017]">
                            {rev.authorName.charAt(0)}
                          </span>
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-[#111827]">{rev.authorName}</p>
                          <GoogleStarRating rating={rev.rating} className="mt-0.5 text-sm" />
                          <p className="mt-2 text-xs text-[#6b7280]">{rev.relativeTime}</p>
                        </div>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-[#374151] line-clamp-6">{rev.text}</p>
                    </li>
                  ))}
                </ul>
              ) : null}

              <p className="mt-4 text-xs text-[#6b7280]">
                Reviews shown here are provided by Google and may not include every public review.
              </p>
            </div>
          ) : process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID && !process.env.GOOGLE_PLACES_API_KEY ? (
            <p className="mt-8 border-t border-gray-200 pt-6 text-xs text-[#6b7280]">
              Add <code className="rounded bg-gray-100 px-1 py-0.5 text-[11px]">GOOGLE_PLACES_API_KEY</code>{" "}
              (server env) with Places API enabled to show live ratings and snippets here.
            </p>
          ) : null}
        </div>

        <p className="mt-6 text-center text-sm text-[#6b7280]">
          Prefer to browse on Google?{" "}
          {mapsUrl ? (
            <a
              href={mapsUrl}
              className="font-semibold text-[#111827] underline-offset-2 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open our Google Business profile
            </a>
          ) : (
            <span>Add your Place ID to show this link.</span>
          )}
        </p>
      </div>
    </section>
  );
}
