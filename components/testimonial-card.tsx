type TestimonialCardProps = {
  name: string;
  city: string;
  quote: string;
};

export function TestimonialCard({ name, city, quote }: TestimonialCardProps) {
  return (
    <article className="card-premium border-l-4 border-l-[#d4a017]">
      <p className="text-sm text-[#374151]">“{quote}”</p>
      <div className="mt-4">
        <p className="font-semibold text-[#111827]">{name}</p>
        <p className="text-xs uppercase tracking-[0.16em] text-[#6b7280]">{city}, FL</p>
      </div>
    </article>
  );
}
