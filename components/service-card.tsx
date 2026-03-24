import Link from "next/link";

type ServiceCardProps = {
  title: string;
  summary: string;
};

export function ServiceCard({ title, summary }: ServiceCardProps) {
  return (
    <article className="card-premium group h-full cursor-pointer">
      <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#1f2937] text-sm font-bold text-[#d4a017] transition duration-300 group-hover:-translate-y-0.5">
        ★
      </div>
      <h3 className="text-xl font-bold text-[#111827]">{title}</h3>
      <p className="mt-3 text-sm text-[#6b7280]">{summary}</p>
      <Link
        href="/contact"
        className="link-inline mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#1f2937]"
      >
        Get an Estimate <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
      </Link>
    </article>
  );
}
