import Link from "next/link";

type ServiceDetailCardProps = {
  title: string;
  overview: string;
  benefits: string[];
  reason: string;
};

export function ServiceDetailCard({ title, overview, benefits, reason }: ServiceDetailCardProps) {
  return (
    <article className="card-premium">
      <h2 className="text-2xl font-bold text-[#111827]">{title}</h2>
      <p className="mt-3 text-[#4b5563]">{overview}</p>
      <ul className="mt-4 space-y-2">
        {benefits.map((benefit) => (
          <li key={benefit} className="flex items-start gap-2 text-sm text-[#374151]">
            <span className="mt-1 text-[#d4a017]">●</span>
            <span>{benefit}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm font-medium text-[#1f2937]">{reason}</p>
      <Link href="/contact" className="link-inline mt-5 text-sm font-semibold text-[#1f2937]">
        Request a free quote for this service →
      </Link>
    </article>
  );
}
