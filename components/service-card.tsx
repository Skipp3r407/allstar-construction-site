import Link from "next/link";

type ServiceCardProps = {
  title: string;
  summary: string;
};

export function ServiceCard({ title, summary }: ServiceCardProps) {
  return (
    <article className="card-premium">
      <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#1f2937] text-sm font-bold text-[#d4a017]">
        ★
      </div>
      <h3 className="text-xl font-bold text-[#111827]">{title}</h3>
      <p className="mt-3 text-sm text-[#6b7280]">{summary}</p>
      <Link href="/contact" className="mt-4 inline-block text-sm font-semibold text-[#1f2937] hover:text-[#d4a017]">
        Get an Estimate →
      </Link>
    </article>
  );
}
