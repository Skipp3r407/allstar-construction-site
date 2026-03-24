type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
}: SectionHeadingProps) {
  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#d4a017]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="heading-lg">{title}</h2>
      {description ? <p className="copy-muted mt-4">{description}</p> : null}
    </div>
  );
}
