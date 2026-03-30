import Link from "next/link";
import { ServiceIcon } from "@/components/service-icon";

type ServiceCardProps = {
  title: string;
  summary: string;
};

export function ServiceCard({ title, summary }: ServiceCardProps) {
  return (
    <article className="card-premium group h-full cursor-pointer motion-reduce:transform-none">
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#1f2937] to-[#111827] text-[#d4a017] shadow-inner transition duration-300 group-hover:scale-105 group-hover:shadow-md group-hover:shadow-[#d4a017]/15">
        <ServiceIcon title={title} className="h-6 w-6" />
      </div>
      <h3 className="text-xl font-bold text-[#111827]">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-[#6b7280]">{summary}</p>
      <Link
        href="/contact"
        className="link-inline mt-4 inline-flex min-h-[44px] items-center gap-1 text-sm font-semibold text-[#1f2937]"
      >
        Get a Quote <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
      </Link>
    </article>
  );
}
