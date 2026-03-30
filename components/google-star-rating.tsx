type GoogleStarRatingProps = {
  rating: number;
  max?: number;
  className?: string;
};

/** Simple star row for Google ratings (1–5). */
export function GoogleStarRating({ rating, max = 5, className = "" }: GoogleStarRatingProps) {
  const clamped = Math.min(max, Math.max(0, Math.round(Number(rating))));
  return (
    <span
      className={`inline-flex items-center gap-0.5 text-[#d4a017] ${className}`}
      aria-label={`${rating} out of ${max} stars`}
    >
      {Array.from({ length: max }, (_, i) => (
        <span key={i} className="text-base leading-none">
          {i < clamped ? "★" : "☆"}
        </span>
      ))}
    </span>
  );
}
